"use client";

import { Search } from "@/components/icons";
import { Kbd } from "@/components/ui/kbd";
import { useCommandPalette } from "@/components/providers";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  const { setOpen } = useCommandPalette();

  return (
    <button
      className={`flex h-7 items-center justify-between lg:gap-8 gap-1.5 rounded-full bg-gray-100 border-border-base border-[0.5px] px-2 hover:bg-gray-200 transition-colors ${className}`}
      onClick={() => setOpen(true)}
    >
      <div className="flex flex-row items-center gap-1">
        <Search className="size-[0.875rem] text-disabled" />
        <span className="sub-2xs text-disabled !leading-none hidden lg:block">
          Search
        </span>
      </div>

      <Kbd variant="muted">⌘K</Kbd>
    </button>
  );
}
