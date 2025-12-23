"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import { CategoriesTable } from "./categories-table";
import { CreateCategoryModal } from "./create-category-modal";
import { DeleteCategoryModal } from "./delete-category-modal";
import { EditCategoryModal } from "./edit-category-modal";
import { ReorderCategoryModal } from "./reorder-category-modal";
import type { CategoryWithCount } from "@/lib/data/categories";

async function reorderCategories(
  categories: { id: string; order: number }[],
): Promise<{ success: boolean; error?: string }> {
  const response = await fetch("/api/categories/reorder", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categories }),
  });

  if (!response.ok) {
    const data = await response.json();
    return { success: false, error: data.error || "Failed to reorder" };
  }

  return { success: true };
}

interface CategoriesListProps {
  categories: CategoryWithCount[];
  onCreateClick?: () => void;
  createModalOpen?: boolean;
  onCreateModalChange?: (open: boolean) => void;
  reorderModalOpen?: boolean;
  onReorderModalChange?: (open: boolean) => void;
}

export function CategoriesList({
  categories: initialCategories,
  createModalOpen = false,
  onCreateModalChange,
  reorderModalOpen = false,
  onReorderModalChange,
}: CategoriesListProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [editingCategory, setEditingCategory] =
    useState<CategoryWithCount | null>(null);
  const [deletingCategory, setDeletingCategory] =
    useState<CategoryWithCount | null>(null);

  useEffect(() => {
    setCategories(initialCategories);
  }, [initialCategories]);

  const handleCreate = useCallback((optimisticCategory: CategoryWithCount) => {
    setCategories((prev) => [...prev, optimisticCategory]);
  }, []);

  const handleCreateSuccess = useCallback(
    (tempId: string, realCategory: CategoryWithCount) => {
      setCategories((prev) =>
        prev.map((c) =>
          c.id === tempId ? { ...realCategory, componentCount: 0 } : c,
        ),
      );
    },
    [],
  );

  const handleCreateError = useCallback((tempId: string, error: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== tempId));
    toast.error("Failed to create category", { description: error });
  }, []);

  const handleEdit = useCallback((updatedCategory: CategoryWithCount) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === updatedCategory.id ? updatedCategory : c)),
    );
    setEditingCategory(null);
  }, []);

  const handleEditError = useCallback(
    (originalCategory: CategoryWithCount, error: string) => {
      setCategories((prev) =>
        prev.map((c) => (c.id === originalCategory.id ? originalCategory : c)),
      );
      toast.error("Failed to update category", { description: error });
    },
    [],
  );

  const handleDelete = useCallback((deletedCategory: CategoryWithCount) => {
    setCategories((prev) => prev.filter((c) => c.id !== deletedCategory.id));
    setDeletingCategory(null);
  }, []);

  const handleDeleteError = useCallback(
    (category: CategoryWithCount, error: string) => {
      setCategories((prev) => [...prev, category]);
      toast.error("Failed to delete category", { description: error });
    },
    [],
  );

  const previousOrderRef = useRef<CategoryWithCount[]>([]);

  const handleReorder = useCallback(
    async (newOrder: CategoryWithCount[]) => {
      previousOrderRef.current = categories;
      setCategories(newOrder);

      const result = await reorderCategories(
        newOrder.map((cat, index) => ({ id: cat.id, order: index })),
      );

      if (!result.success) {
        setCategories(previousOrderRef.current);
        toast.error("Failed to reorder categories", {
          description: result.error,
        });
      }
    },
    [categories],
  );

  return (
    <>
      <CategoriesTable
        data={categories}
        onEditClick={(category) => setEditingCategory(category)}
        onDeleteClick={(category) => setDeletingCategory(category)}
      />

      <CreateCategoryModal
        open={createModalOpen}
        onOpenChange={(open) => onCreateModalChange?.(open)}
        onSubmit={handleCreate}
        onSuccess={handleCreateSuccess}
        onError={handleCreateError}
      />

      <EditCategoryModal
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
        category={editingCategory}
        onSubmit={handleEdit}
        onError={handleEditError}
      />

      <DeleteCategoryModal
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        category={deletingCategory}
        onSubmit={handleDelete}
        onError={handleDeleteError}
      />

      <ReorderCategoryModal
        open={reorderModalOpen}
        onOpenChange={(open) => onReorderModalChange?.(open)}
        categories={categories}
        onReorder={handleReorder}
      />
    </>
  );
}
