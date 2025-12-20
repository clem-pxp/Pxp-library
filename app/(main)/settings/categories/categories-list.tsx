"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CategoryModal } from "./category-modal";
import { DeleteCategoryModal } from "./delete-category-modal";
import type { CategoryWithCount } from "@/lib/data/categories";

interface CategoriesListProps {
  categories: CategoryWithCount[];
}

export function CategoriesList({
  categories: initialCategories,
}: CategoriesListProps) {
  const [categories, setCategories] = useState(initialCategories);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryWithCount | null>(null);
  const [deletingCategory, setDeletingCategory] =
    useState<CategoryWithCount | null>(null);

  const handleCreate = (newCategory: CategoryWithCount) => {
    setCategories([...categories, newCategory]);
    setIsCreateOpen(false);
  };

  const handleUpdate = (updatedCategory: CategoryWithCount) => {
    setCategories(
      categories.map((c) =>
        c.id === updatedCategory.id ? updatedCategory : c,
      ),
    );
    setEditingCategory(null);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
    setDeletingCategory(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Add button */}
      <div className="flex justify-end">
        <Button onClick={() => setIsCreateOpen(true)} structure="icon">
          <Plus className="size-4" />
          Add category
        </Button>
      </div>

      {/* Categories list */}
      <div className="flex flex-col gap-2">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex items-center gap-3 rounded-12 border border-border-soft p-3 transition-colors hover:bg-gray-50"
          >
            {/* Drag handle */}
            <GripVertical className="size-4 text-soft cursor-grab" />

            {/* Color indicator */}
            <div
              className="size-3 rounded-full"
              style={{ backgroundColor: category.color }}
            />

            {/* Name */}
            <span className="flex-1 font-medium text-strong">
              {category.name}
            </span>

            {/* Component count */}
            <span className="text-sm text-soft">
              {category.componentCount} component
              {category.componentCount !== 1 ? "s" : ""}
            </span>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <Button
                color="ghost"
                structure="icon-only"
                size="sm"
                onClick={() => setEditingCategory(category)}
              >
                <Pencil className="size-3.5" />
              </Button>
              <Button
                color="ghost"
                structure="icon-only"
                size="sm"
                onClick={() => setDeletingCategory(category)}
                disabled={categories.length <= 1}
              >
                <Trash2 className="size-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="rounded-12 border border-dashed border-border-soft p-8 text-center">
          <p className="text-soft">No categories yet</p>
          <Button
            onClick={() => setIsCreateOpen(true)}
            color="outline"
            className="mt-4"
          >
            Create your first category
          </Button>
        </div>
      )}

      {/* Create Modal */}
      <CategoryModal
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
      />

      {/* Edit Modal */}
      <CategoryModal
        open={!!editingCategory}
        onOpenChange={(open) => !open && setEditingCategory(null)}
        category={editingCategory || undefined}
        onSubmit={handleUpdate}
      />

      {/* Delete Modal */}
      <DeleteCategoryModal
        open={!!deletingCategory}
        onOpenChange={(open) => !open && setDeletingCategory(null)}
        category={deletingCategory}
        onConfirm={handleDelete}
      />
    </div>
  );
}
