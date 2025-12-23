"use client";

import { Search } from "@/components/icons";

interface SearchBarProps {
  className?: string;
}

export function SearchBar({ className }: SearchBarProps) {
  return (
    <button
      className={`flex h-7 items-center justify-between lg:gap-8 gap-1.5 rounded-full bg-gray-100 border-border-base border-[0.5px] px-2 hover:bg-gray-200 transition-colors ${className}`}
      onClick={() => {
        // TODO: Open command palette
      }}
    >
      {/* Left: Icon + Text */}
      <div className="flex flex-row items-center gap-1">
        <Search className="size-[0.875rem] text-disabled" />
        <span className="sub-2xs text-disabled !leading-none hidden lg:block">Search</span>
      </div>

      {/* Right: Keyboard shortcut */}
      <div className="px-1 py-[0.125rem] rounded-4 bg-gray-300 text-disabled font-medium text-[0.625rem] leading-tight">
        ⌘K
      </div>
    </button>
  );
}
