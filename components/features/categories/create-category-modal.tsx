"use client";

import { useState } from "react";
import { nanoid } from "nanoid";
import { Modal, ModalContent } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconPicker } from "@/components/shared";
import { Cross, Enter } from "@/components/icons";
import type { CategoryWithCount } from "@/lib/data/categories";

interface CreateCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (category: CategoryWithCount) => void;
  onSuccess?: (tempId: string, realCategory: CategoryWithCount) => void;
  onError?: (tempId: string, error: string) => void;
}

export function CreateCategoryModal({
  open,
  onOpenChange,
  onSubmit,
  onSuccess,
  onError,
}: CreateCategoryModalProps) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const tempId = `temp-${nanoid()}`;
    const optimisticCategory: CategoryWithCount = {
      id: tempId,
      name,
      slug,
      icon: icon || null,
      status: "PUBLISHED",
      order: 999,
      componentCount: 0,
      createdAt: new Date(),
      createdBy: null,
    };

    onSubmit(optimisticCategory);
    onOpenChange(false);
    setName("");
    setIcon("");

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          icon,
          status: "PUBLISHED",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await response.json();
      onSuccess?.(tempId, data.category);
    } catch (err) {
      onError?.(
        tempId,
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  };

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent size="small" showCloseButton={false}>
        <form onSubmit={handleSubmit}>
          <div className="h-[2.625rem] pl-3 pr-[0.5rem] flex items-center justify-between border-b-1 border-border-base">
            <span className="sub-xs text-base">Add category</span>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="size-8 flex items-center justify-center text-soft hover:text-strong transition-colors"
            >
              <Cross className="w-[0.875rem]" />
            </button>
          </div>

          <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="icon">Icon</Label>
              <IconPicker value={icon} onChange={setIcon} />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Animations"
                required
              />
            </div>
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
            <Button type="submit" layout="keyboard" disabled={!name.trim()}>
              Create
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
