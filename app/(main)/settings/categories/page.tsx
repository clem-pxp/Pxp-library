"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCurrentUser, useCategories } from "@/lib/hooks";
import { hasPermission } from "@/lib/permissions";
import { CategoriesList } from "./categories-list";

export default function CategoriesPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: categories = [] } = useCategories();

  useEffect(() => {
    if (!userLoading && user && !hasPermission(user.role, "ADMIN")) {
      router.replace("/settings/preferences");
    }
  }, [user, userLoading, router]);

  if (userLoading || !user || !hasPermission(user.role, "ADMIN")) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-xl font-semibold text-strong">Categories</h1>
        <p className="mt-1 text-sm text-soft">
          Manage your component categories
        </p>
      </div>
      <CategoriesList categories={categories} />
    </div>
  );
}
