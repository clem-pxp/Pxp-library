"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Search } from "@/components/icons";
import { Input } from "./input";

interface SearchInputProps extends Omit<React.ComponentProps<"input">, "type"> {
  iconClassName?: string;
}

function SearchInput({ className, iconClassName, ...props }: SearchInputProps) {
  return (
    <div className="relative w-fit">
      <Search
        className={cn(
          "size-[0.875rem] absolute left-2 top-1/2 -translate-y-1/2 text-disabled pointer-events-none",
          iconClassName,
        )}
      />
      <Input
        type="text"
        className={cn(
          "rounded-8 bg-gray-50 h-[1.875rem] border-1 border-border-base focus:border-blue-500 focus-visible:ring-0 transition-colors duration-100 pr-2 pl-[1.875rem] placeholder:text-xs placeholder:text-disabled",
          className,
        )}
        {...props}
      />
    </div>
  );
}

export { SearchInput };
