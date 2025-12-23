import { NextResponse } from "next/server";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db, categories } from "@/src/db";
import { requireRole } from "@/src/lib/auth-utils";

const reorderSchema = z.object({
  categories: z.array(
    z.object({
      id: z.string(),
      order: z.number(),
    }),
  ),
});

export async function PUT(request: Request) {
  try {
    await requireRole("ADMIN");

    const body = await request.json();
    const data = reorderSchema.parse(body);

    for (const cat of data.categories) {
      await db
        .update(categories)
        .set({ order: cat.order, updatedAt: new Date() })
        .where(eq(categories.id, cat.id));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 },
      );
    }

    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Error reordering categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
