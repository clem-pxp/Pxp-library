import { NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { z } from "zod";
import { eq, sql, asc } from "drizzle-orm";
import { db, categories, components, users } from "@/src/db";
import { requireRole, getCurrentUser } from "@/src/lib/auth-utils";

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        icon: categories.icon,
        status: categories.status,
        order: categories.order,
        componentCount: sql<number>`count(${components.id})::int`,
        createdAt: categories.createdAt,
        creatorId: users.id,
        creatorUsername: users.username,
        creatorAvatarUrl: users.avatarUrl,
      })
      .from(categories)
      .leftJoin(components, eq(components.categoryId, categories.id))
      .leftJoin(users, eq(users.id, categories.createdById))
      .where(eq(categories.libraryId, user.libraryId))
      .groupBy(categories.id, users.id, users.username, users.avatarUrl)
      .orderBy(asc(categories.order));

    const data = result.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      icon: row.icon,
      status: row.status,
      order: row.order,
      componentCount: row.componentCount,
      createdAt: row.createdAt,
      createdBy: row.creatorId
        ? {
            id: row.creatorId,
            username: row.creatorUsername,
            avatarUrl: row.creatorAvatarUrl,
          }
        : null,
    }));

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

const createCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  icon: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).optional(),
});

export async function POST(request: Request) {
  try {
    const user = await requireRole("ADMIN");

    const body = await request.json();
    const data = createCategorySchema.parse(body);

    // Check if slug already exists in this library
    const existing = await db.query.categories.findFirst({
      where: eq(categories.slug, data.slug),
    });

    if (existing && existing.libraryId === user.libraryId) {
      return NextResponse.json(
        { error: "A category with this slug already exists" },
        { status: 400 },
      );
    }

    // Get max order
    const allCategories = await db.query.categories.findMany({
      where: eq(categories.libraryId, user.libraryId),
    });
    const maxOrder = Math.max(...allCategories.map((c) => c.order), -1);

    // Create category
    const id = nanoid();
    await db.insert(categories).values({
      id,
      name: data.name,
      slug: data.slug,
      icon: data.icon || null,
      status: data.status || "PUBLISHED",
      order: maxOrder + 1,
      libraryId: user.libraryId,
      createdById: user.id,
    });

    const category = await db.query.categories.findFirst({
      where: eq(categories.id, id),
      with: { components: true },
    });

    return NextResponse.json({
      category: {
        ...category,
        componentCount: category?.components?.length || 0,
        createdBy: {
          id: user.id,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
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

    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
