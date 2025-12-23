"use client";

import { Modal, ModalContent } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Cross, Enter } from "@/components/icons";
import type { CategoryWithCount } from "@/lib/data/categories";

interface DeleteCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: CategoryWithCount | null;
  onSubmit: (category: CategoryWithCount) => void;
  onError?: (category: CategoryWithCount, error: string) => void;
}

export function DeleteCategoryModal({
  open,
  onOpenChange,
  category,
  onSubmit,
  onError,
}: DeleteCategoryModalProps) {
  if (!category) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const deletedCategory = { ...category };

    onSubmit(deletedCategory);
    onOpenChange(false);

    try {
      const response = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }
    } catch (err) {
      onError?.(
        deletedCategory,
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="small" showCloseButton={false}>
        <form onSubmit={handleSubmit}>
          <div className="h-[2.625rem] pl-3 pr-[0.5rem] flex items-center justify-between border-b-1 border-border-base">
            <span className="sub-xs text-base">Delete {category.name}</span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="size-8 flex items-center justify-center text-soft hover:text-strong transition-colors"
            >
              <Cross className="w-[0.875rem]" />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-4">
            <p className="sub-xs text-soft">
              Cette action est irréversible, {category.name} sera définitivement
              supprimé.
            </p>
          </div>

          <div className="p-2 flex gap-2 items-center justify-end border-t-1 border-border-base">
            <Button
              type="button"
              color="outline"
              layout="keyboard"
              onClick={() => onOpenChange(false)}
            >
              Cancel
              <div className="flex items-center justify-center rounded-4 bg-light/10 h-4 px-1 border-[0.5px] border-border-base text-soft flex items-center justify-center">
                <span className="text-2xs !leading-none text-disabled pb-[1px]">
                  esc
                </span>
              </div>
            </Button>
            <Button type="submit" layout="keyboard">
              Delete
              <div className="flex items-center justify-center rounded-4 bg-light/10 size-4">
                <Enter className="size-3" />
              </div>
            </Button>
          </div>
        </form>
      </ModalContent>
    </Modal>
  );
}
