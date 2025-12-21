"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
}

export function CreateCategoryModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateCategoryModalProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");

      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug,
          color: "#6366f1",
          icon,
          status: "PUBLISHED",
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Something went wrong");
      }

      const data = await response.json();
      onSubmit(data.category);
      router.refresh();
      onOpenChange(false);
      setName("");
      setIcon("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
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

            {error && <p className="text-sm text-error-base">{error}</p>}
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
            <Button
              type="submit"
              layout="keyboard"
              disabled={isLoading || !name.trim()}
            >
              {isLoading ? "Creating..." : "Create"}
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
