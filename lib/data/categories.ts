import { cache } from "react";
import { eq, sql, asc } from "drizzle-orm";
import { db, categories, components, users } from "@/src/db";
import { getCurrentUser } from "@/src/lib/auth-utils";

import type { CategoryStatus } from "@/src/db/schema";

export type CategoryCreator = {
  id: string;
  username: string | null;
  avatarUrl: string | null;
};

export type CategoryWithCount = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  status: CategoryStatus;
  order: number;
  componentCount: number;
  createdAt: Date;
  createdBy: CategoryCreator | null;
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
      .where(eq(categories.libraryId, targetLibraryId))
      .groupBy(categories.id, users.id, users.username, users.avatarUrl)
      .orderBy(asc(categories.order));

    return result.map((row) => ({
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
  },
);
