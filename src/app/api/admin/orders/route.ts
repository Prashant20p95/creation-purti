import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const isAuthed = await isAuthenticatedAdmin();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: { items: true },
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const isAuthed = await isAuthenticatedAdmin();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      id,
      orderStatus,
      paymentStatus,
      notes,
      courierPartner,
      trackingNumber,
      trackingUrl,
      dispatchDate,
      adminNotes,
    } = body;

    if (!id) {
      return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { id },
      data: {
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus }),
        ...(notes !== undefined && { notes }),
        ...(courierPartner !== undefined && { courierPartner }),
        ...(trackingNumber !== undefined && { trackingNumber }),
        ...(trackingUrl !== undefined && { trackingUrl }),
        ...(dispatchDate !== undefined && {
          dispatchDate: dispatchDate ? new Date(dispatchDate) : null,
        }),
        ...(adminNotes !== undefined && { adminNotes }),
      },
    });

    return NextResponse.json({ success: true, order: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
