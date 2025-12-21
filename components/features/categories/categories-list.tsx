"use client";

import { useState, useEffect } from "react";
import { CategoriesTable } from "./categories-table";
import { DeleteCategoryModal } from "./delete-category-modal";
import type { CategoryWithCount } from "@/lib/data/categories";

interface CategoriesListProps {
  categories: CategoryWithCount[];
}

export function CategoriesList({
  categories: initialCategories,
}: CategoriesListProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [deletingCategory, setDeletingCategory] =
    useState<CategoryWithCount | null>(null);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    setDeletingCategory(null);
  };

  return (
    <>
      <CategoriesTable data={categories} />

      <DeleteCategoryModal
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        category={deletingCategory}
        onConfirm={handleDelete}
      />
    </>
  );
}
