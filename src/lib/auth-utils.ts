import { cache } from "react";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { auth } from "./auth";
import { db, libraryMembers, type Role } from "@/src/db";
import { hasPermission, ROLE_HIERARCHY } from "@/lib/permissions";

export { hasPermission, ROLE_HIERARCHY };

export type CurrentUser = {
  id: string;
  email: string;
  name: string | null;
  username: string | null;
  avatarUrl: string | null;
  role: Role;
  libraryId: string;
  libraryName: string;
};

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const membership = await db.query.libraryMembers.findFirst({
    where: eq(libraryMembers.userId, session.user.id),
    with: {
      library: true,
      user: true,
    },
  });

  if (!membership?.user) {
    return null;
  }

  return {
    id: membership.user.id,
    email: membership.user.email,
    name: membership.user.name,
    username: membership.user.username,
    avatarUrl: membership.user.avatarUrl,
    role: membership.role as Role,
    libraryId: membership.libraryId,
    libraryName: membership.library?.name || "My Library",
  };
});

export async function requireAuth(): Promise<CurrentUser> {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export async function requireRole(requiredRole: Role): Promise<CurrentUser> {
  const user = await requireAuth();

  if (!hasPermission(user.role, requiredRole)) {
    throw new Error("Forbidden");
  }

  return user;
}
