"use client";

import { useState } from "react";
import { Reorder, useDragControls } from "motion/react";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Cross, Enter, GripVertical } from "@/components/icons";
import { CATEGORY_ICONS } from "@/lib/icons-map";
import type { CategoryWithCount } from "@/lib/data/categories";

interface ReorderCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categories: CategoryWithCount[];
  onReorder: (categories: CategoryWithCount[]) => void;
}

const DefaultIcon = CATEGORY_ICONS.default;

function DraggableCategory({ category }: { category: CategoryWithCount }) {
  const controls = useDragControls();
  const [isDragging, setIsDragging] = useState(false);
  const Icon = category.icon
    ? (CATEGORY_ICONS[category.icon] ?? DefaultIcon)
    : DefaultIcon;

  return (
    <Reorder.Item
      value={category}
      dragListener={false}
      dragControls={controls}
      className="flex items-center gap-2 cursor-default"
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{ position: "relative" }}
      animate={{
        zIndex: isDragging ? 50 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 35,
      }}
    >
      <button
        type="button"
        className="flex cursor-grab items-center justify-center text-disabled transition-colors hover:text-soft active:cursor-grabbing"
        onPointerDown={(e) => {
          e.preventDefault();
          controls.start(e);
        }}
        style={{ touchAction: "none" }}
      >
        <GripVertical className="size-[0.875rem]" />
      </button>
      <div className="flex-1 px-2 h-[2rem] rounded-8 shadow-lg bg-light flex items-center gap-[0.375rem]">
        <Icon className="size-4 text-soft" />
        <span className="sub-xs text-base flex-1">{category.name}</span>
        <span className="text-2xs text-disabled">
          {category.componentCount} components
        </span>
      </div>
    </Reorder.Item>
  );
}

function ReorderContent({
  categories,
  onReorder,
  onClose,
}: {
  categories: CategoryWithCount[];
  onReorder: (categories: CategoryWithCount[]) => void;
  onClose: () => void;
}) {
  const [orderedCategories, setOrderedCategories] =
    useState<CategoryWithCount[]>(categories);

  const handleSave = () => {
    onReorder(orderedCategories);
    onClose();
  };

  const hasChanges =
    JSON.stringify(orderedCategories.map((c) => c.id)) !==
    JSON.stringify(categories.map((c) => c.id));

  return (
    <>
      <div className="h-[2.625rem] pl-3 pr-[0.5rem] flex items-center justify-between border-b-1 border-border-base">
        <span className="sub-xs text-base">Reorder categories</span>
        <button
          type="button"
          onClick={onClose}
          className="size-8 flex items-center justify-center text-soft hover:text-strong transition-colors"
        >
          <Cross className="w-[0.875rem]" />
        </button>
      </div>

      <div className="pr-4 pl-2.5 py-4 flex flex-col gap-2 max-h-[60vh] overflow-y-auto">
        <Reorder.Group
          axis="y"
          values={orderedCategories}
          onReorder={setOrderedCategories}
          className="flex flex-col gap-2"
        >
          {orderedCategories.map((category) => (
            <DraggableCategory key={category.id} category={category} />
          ))}
        </Reorder.Group>
      </div>

      <div className="p-2 flex gap-2 items-center justify-end border-t-1 border-border-base">
        <Button
          type="button"
          color="outline"
          layout="keyboard"
          onClick={onClose}
        >
          Cancel
          <div className="flex items-center justify-center rounded-4 bg-light/10 h-4 px-1 border-[0.5px] border-border-base text-soft">
            <span className="text-2xs !leading-none text-disabled pb-[1px]">
              esc
            </span>
          </div>
        </Button>
        <Button
          type="button"
          layout="keyboard"
          onClick={handleSave}
          disabled={!hasChanges}
        >
          Save
          <div className="flex items-center justify-center rounded-4 bg-light/10 size-4">
            <Enter className="size-3" />
          </div>
        </Button>
      </div>
    </>
  );
}

export function ReorderCategoryModal({
  open,
  onOpenChange,
  categories,
  onReorder,
}: ReorderCategoryModalProps) {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="small" showCloseButton={false}>
        {open && (
          <ReorderContent
            categories={categories}
            onReorder={onReorder}
            onClose={() => onOpenChange(false)}
          />
        )}
      </ModalContent>
    </Modal>
  );
}
