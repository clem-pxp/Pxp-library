"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { CategoryWithCount } from "@/lib/data/categories";

interface DeleteCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryWithCount | null;
  onConfirm: (id: string) => void;
}

export function DeleteCategoryModal({
  open,
  onOpenChange,
  category,
  onConfirm,
}: DeleteCategoryModalProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!category) return null;

  const handleDelete = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      onConfirm(category.id);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete category</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete &quot;{category.name}&quot;?
            {category.componentCount > 0 && (
              <span className="block mt-2 text-red-500">
                This category contains {category.componentCount} component
                {category.componentCount !== 1 ? "s" : ""}. You must move them
                to another category first.
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <DialogFooter>
          <Button
            type="button"
            color="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            color="destructive"
            onClick={handleDelete}
            disabled={isLoading || category.componentCount > 0}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
