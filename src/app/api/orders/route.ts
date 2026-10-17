import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { brandConfig } from "@/config/brand";
import { z } from "zod";

const OrderSchema = z.object({
  customerName: z.string().min(2, "Name must be at least 2 characters"),
  customerPhone: z.string().regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit Indian mobile number"),
  customerEmail: z.string().email().optional().or(z.literal("")),
  addressLine1: z.string().min(5, "Flat/House and Street address is required"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().regex(/^\d{6}$/, "Please enter a valid 6-digit PIN code"),
  landmark: z.string().optional(),
  deliveryInstructions: z.string().optional(),
  paymentMethod: z.enum(["COD", "WHATSAPP_CONFIRMED", "TEST_PAYMENT"]),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().int().min(1),
      customization: z.string().optional(),
    })
  ).min(1, "Order must contain at least one item"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = OrderSchema.parse(body);

    // Fetch verified products from database to calculate server-side totals
    const productIds = validated.items.map((i) => i.productId);
    const dbProducts = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (dbProducts.length !== productIds.length) {
      return NextResponse.json(
        { error: "One or more products in your cart could not be found." },
        { status: 400 }
      );
    }

    // Verify prices and stock
    let subtotal = 0;
    const orderItemsData = [];

    for (const item of validated.items) {
      const prod = dbProducts.find((p) => p.id === item.productId);
      if (!prod) continue;
      
      if (!prod.price || !prod.isPriceConfirmed || !prod.inStock) {
        return NextResponse.json(
          { error: `Item "${prod.title}" is currently unpublished or not available for online purchase.` },
          { status: 400 }
        );
      }

      if (prod.stock < item.quantity) {
        return NextResponse.json(
          { error: `Item "${prod.title}" only has ${prod.stock} unit(s) remaining in stock.` },
          { status: 400 }
        );
      }

      const itemTotal = prod.price * item.quantity;
      subtotal += itemTotal;

      const images = JSON.parse(prod.images || "[]");
      orderItemsData.push({
        productId: prod.id,
        productTitle: prod.title,
        productImage: images[0] || null,
        unitPrice: prod.price,
        quantity: item.quantity,
        totalPrice: itemTotal,
        customization: item.customization || null,
      });
    }

    // Server-side shipping fee calculation
    const isFreeShipping = subtotal >= brandConfig.shippingPolicy.freeShippingThreshold;
    const shippingFee = isFreeShipping ? 0 : brandConfig.shippingPolicy.standardShippingFee;
    const totalAmount = subtotal + shippingFee;

    // Generate unique order number (e.g. PC-2026-1042)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `PC-2026-${randomSuffix}`;

    // Payment status assignment
    let paymentStatus = "PENDING";
    if (validated.paymentMethod === "COD") {
      paymentStatus = "COD_ON_DELIVERY";
    } else if (validated.paymentMethod === "TEST_PAYMENT") {
      paymentStatus = "PAID (TEST MODE)";
    }

    // Create Order and OrderItems in database transaction
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: validated.customerName,
        customerPhone: validated.customerPhone,
        customerEmail: validated.customerEmail || null,
        addressLine1: validated.addressLine1,
        addressLine2: validated.addressLine2 || null,
        city: validated.city,
        state: validated.state,
        pincode: validated.pincode,
        landmark: validated.landmark || null,
        deliveryInstructions: validated.deliveryInstructions || null,
        subtotal,
        shippingFee,
        discount: 0,
        totalAmount,
        paymentMethod: validated.paymentMethod,
        paymentStatus,
        orderStatus: "CONFIRMED",
        items: {
          create: orderItemsData,
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({
      success: true,
      orderNumber: order.orderNumber,
      orderId: order.id,
      totalAmount: order.totalAmount,
      customerPhone: order.customerPhone,
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0]?.message || "Validation failed" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: error?.message || "Failed to process order. Please try again." },
      { status: 500 }
    );
  }
}
