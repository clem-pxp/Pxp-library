"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useCurrentUser, useCategories } from "@/lib/hooks";
import { hasPermission } from "@/lib/permissions";
import { CategoriesList } from "@/components/features/categories";
import { SearchInput } from "@/components/ui/search-input";
import { Button } from "@/components/ui/button";
import { Sort } from "@/components/icons";

export default function CategoriesPage() {
  const router = useRouter();
  const { data: user, isLoading: userLoading } = useCurrentUser();
  const { data: categories = [] } = useCategories();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isReorderOpen, setIsReorderOpen] = useState(false);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase();
    return categories.filter((category) =>
      category.name.toLowerCase().includes(query),
    );
  }, [categories, searchQuery]);

  useEffect(() => {
    if (!userLoading && user && !hasPermission(user.role, "ADMIN")) {
      router.replace("/settings/preferences");
    }
  }, [user, userLoading, router]);

  if (userLoading || !user || !hasPermission(user.role, "ADMIN")) {
    return null;
  }

  return (
    <div className="xl:py-20 py-10">
      <div className="w-full">
        <div className="flex flex-col gap-8">
          <div className="xl:px-14 px-5 xl:mb-10 mb-5">
            <h1 className="sub-3xl text-strong">Categories</h1>
            <p className="mt-1 text-sm text-soft">
              Manage your component categories
            </p>
          </div>
          <div className="w-full xl:px-14 px-5 flex justify-between items-center flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <SearchInput
                placeholder="Search by name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="min-w-65 !leading-tight"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                layout="icon"
                size="xl"
                color="outline"
                onClick={() => setIsReorderOpen(true)}
              >
                <Sort className="size-4" />
                <span className="sub-xs !leading-none">Re-order</span>
              </Button>
              <Button
                layout="icon"
                size="xl"
                onClick={() => setIsCreateOpen(true)}
              >
                <Plus className="size-4" />
                <span className="sub-xs !leading-none">Create new</span>
              </Button>
            </div>
          </div>
          <div className="w-full overflow-hidden">
            <CategoriesList
              categories={filteredCategories}
              createModalOpen={isCreateOpen}
              onCreateModalChange={setIsCreateOpen}
              reorderModalOpen={isReorderOpen}
              onReorderModalChange={setIsReorderOpen}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
