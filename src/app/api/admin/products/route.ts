import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAuthenticatedAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const isAuthed = await isAuthenticatedAdmin();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ products });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuthed = await isAuthenticatedAdmin();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const slug =
      body.slug ||
      body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const product = await prisma.product.create({
      data: {
        slug,
        title: body.title,
        subtitle: body.subtitle || null,
        shortDescription: body.shortDescription || body.title,
        description: body.description || body.shortDescription || body.title,
        price: body.price !== undefined && body.price !== "" ? Number(body.price) : null,
        compareAtPrice:
          body.compareAtPrice !== undefined && body.compareAtPrice !== ""
            ? Number(body.compareAtPrice)
            : null,
        isPriceConfirmed: Boolean(body.isPriceConfirmed),
        category: body.category || "Festive Door Hangings",
        occasions: body.occasions || "Festive, Celebrations",
        stock: Number(body.stock || 10),
        inStock: body.inStock !== false,
        isFeatured: Boolean(body.isFeatured),
        isBestSeller: Boolean(body.isBestSeller),
        highlights: JSON.stringify(body.highlights || []),
        dimensions: body.dimensions || null,
        materials: body.materials || null,
        includedItems: body.includedItems || null,
        customizationAvailable: Boolean(body.customizationAvailable),
        customizationNote: body.customizationNote || null,
        images: JSON.stringify(body.images || ["/products/shubh-labh-pearl-hanging-1.jpg"]),
        keywords: body.keywords || null,
      },
    });

    return NextResponse.json({ success: true, product });
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
    const { id, ...data } = body;

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.subtitle !== undefined) updateData.subtitle = data.subtitle;
    if (data.shortDescription !== undefined) updateData.shortDescription = data.shortDescription;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.price !== undefined) {
      updateData.price = data.price === null || data.price === "" ? null : Number(data.price);
    }
    if (data.compareAtPrice !== undefined) {
      updateData.compareAtPrice =
        data.compareAtPrice === null || data.compareAtPrice === ""
          ? null
          : Number(data.compareAtPrice);
    }
    if (data.isPriceConfirmed !== undefined) updateData.isPriceConfirmed = Boolean(data.isPriceConfirmed);
    if (data.category !== undefined) updateData.category = data.category;
    if (data.occasions !== undefined) updateData.occasions = data.occasions;
    if (data.stock !== undefined) updateData.stock = Number(data.stock);
    if (data.inStock !== undefined) updateData.inStock = Boolean(data.inStock);
    if (data.isFeatured !== undefined) updateData.isFeatured = Boolean(data.isFeatured);
    if (data.isBestSeller !== undefined) updateData.isBestSeller = Boolean(data.isBestSeller);
    if (data.highlights !== undefined) {
      updateData.highlights = typeof data.highlights === "string" ? data.highlights : JSON.stringify(data.highlights);
    }
    if (data.dimensions !== undefined) updateData.dimensions = data.dimensions;
    if (data.materials !== undefined) updateData.materials = data.materials;
    if (data.includedItems !== undefined) updateData.includedItems = data.includedItems;
    if (data.customizationAvailable !== undefined) {
      updateData.customizationAvailable = Boolean(data.customizationAvailable);
    }
    if (data.customizationNote !== undefined) updateData.customizationNote = data.customizationNote;
    if (data.images !== undefined) {
      updateData.images = typeof data.images === "string" ? data.images : JSON.stringify(data.images);
    }
    if (data.keywords !== undefined) updateData.keywords = data.keywords;

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const isAuthed = await isAuthenticatedAdmin();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
