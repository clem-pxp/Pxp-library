import { NextResponse } from "next/server";
import { eq, ilike, or, and, sql } from "drizzle-orm";
import { db, components, categories } from "@/src/db";
import { getCurrentUser } from "@/src/lib/auth-utils";

export type SearchComponent = {
  id: string;
  name: string;
  slug: string;
  thumbnailUrl: string | null;
  categoryName: string;
  categorySlug: string;
};

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    if (!query || query.length < 1) {
      return NextResponse.json({ data: [] });
    }

    const searchPattern = `%${query}%`;

    const result = await db
      .select({
        id: components.id,
        name: components.name,
        slug: components.slug,
        thumbnailUrl: components.thumbnailUrl,
        categoryName: categories.name,
        categorySlug: categories.slug,
      })
      .from(components)
      .innerJoin(categories, eq(categories.id, components.categoryId))
      .where(
        and(
          eq(components.libraryId, user.libraryId),
          eq(components.isPublished, true),
          or(
            ilike(components.name, searchPattern),
            sql`${components.name} ILIKE ${searchPattern}`,
          ),
        ),
      )
      .limit(10);

    return NextResponse.json({ data: result });
  } catch (error) {
    console.error("Error searching components:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
