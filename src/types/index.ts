export type Role = "OWNER" | "ADMIN" | "BUILDER" | "VIEWER";

export const ROLE_HIERARCHY: Record<Role, number> = {
  OWNER: 4,
  ADMIN: 3,
  BUILDER: 2,
  VIEWER: 1,
};

export function hasPermission(userRole: Role, requiredRole: Role): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

export function canEdit(userRole: Role): boolean {
  return hasPermission(userRole, "BUILDER");
}

export function canManage(userRole: Role): boolean {
  return hasPermission(userRole, "ADMIN");
}

export function canEditComponent(
  userRole: Role,
  createdById: string,
  currentUserId: string,
): boolean {
  // Admins+ can edit any component
  if (hasPermission(userRole, "ADMIN")) return true;
  // Builders can only edit their own components
  if (userRole === "BUILDER" && createdById === currentUserId) return true;
  return false;
}
