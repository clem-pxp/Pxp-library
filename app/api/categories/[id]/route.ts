import { NextResponse } from "next/server";
import { z } from "zod";
import { eq, and } from "drizzle-orm";
import { db, categories } from "@/src/db";
import { requireRole } from "@/src/lib/auth-utils";

const updateCategorySchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  slug: z.string().min(1, "Slug is required").optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format")
    .optional(),
  icon: z.string().optional(),
  order: z.number().optional(),
});

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireRole("ADMIN");
    const { id } = await params;

    const body = await request.json();
    const data = updateCategorySchema.parse(body);

    // Check if category exists and belongs to user's library
    const category = await db.query.categories.findFirst({
      where: and(
        eq(categories.id, id),
        eq(categories.libraryId, user.libraryId),
      ),
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    // Update category
    await db
      .update(categories)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(categories.id, id));

    const updated = await db.query.categories.findFirst({
      where: eq(categories.id, id),
      with: { components: true },
    });

    return NextResponse.json({
      category: {
        ...updated,
        componentCount: updated?.components?.length || 0,
      },
    });
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

    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await requireRole("ADMIN");
    const { id } = await params;

    // Check if category exists and belongs to user's library
    const category = await db.query.categories.findFirst({
      where: and(
        eq(categories.id, id),
        eq(categories.libraryId, user.libraryId),
      ),
      with: { components: true },
    });

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 },
      );
    }

    // Check if it's the last category
    const allCategories = await db.query.categories.findMany({
      where: eq(categories.libraryId, user.libraryId),
    });

    if (allCategories.length <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last category" },
        { status: 400 },
      );
    }

    // Check if category has components
    if (category.components && category.components.length > 0) {
      return NextResponse.json(
        { error: "Cannot delete category with components. Move them first." },
        { status: 400 },
      );
    }

    // Delete category
    await db.delete(categories).where(eq(categories.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "Forbidden") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
