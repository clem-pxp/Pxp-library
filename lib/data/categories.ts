import { cache } from "react";
import { eq, sql, asc } from "drizzle-orm";
import { db, categories, components } from "@/src/db";
import { getCurrentUser } from "@/src/lib/auth-utils";

export type CategoryWithCount = {
  id: string;
  name: string;
  slug: string;
  color: string;
  icon: string | null;
  order: number;
  componentCount: number;
};

export const getCategories = cache(
  async (libraryId?: string): Promise<CategoryWithCount[]> => {
    let targetLibraryId = libraryId;

    if (!targetLibraryId) {
      const user = await getCurrentUser();
      if (!user) {
        return [];
      }
      targetLibraryId = user.libraryId;
    }

    const result = await db
      .select({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
        color: categories.color,
        icon: categories.icon,
        order: categories.order,
        componentCount: sql<number>`count(${components.id})::int`,
      })
      .from(categories)
      .leftJoin(components, eq(components.categoryId, categories.id))
      .where(eq(categories.libraryId, targetLibraryId))
      .groupBy(categories.id)
      .orderBy(asc(categories.order));

    return result;
  },
);
