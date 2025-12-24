import type * as React from "react";

import { cn } from "@/lib/utils";

interface KbdProps extends React.ComponentProps<"kbd"> {
  variant?: "default" | "muted" | "icon" | "shortcut" | "icon-ghost";
}

function Kbd({ className, variant = "default", ...props }: KbdProps) {
  return (
    <kbd
      className={cn(
        "rounded-4 font-sans font-medium",
        variant === "default" &&
          "px-1 py-[0.125rem] text-[0.625rem] leading-tight bg-light/10",
        variant === "muted" &&
          "px-1 py-[0.125rem] text-[0.625rem] leading-tight bg-gray-300 text-disabled",
        variant === "icon" &&
          "size-5 bg-gray-900/6 flex items-center justify-center [&_svg]:size-3",
        variant === "shortcut" &&
          "px-1 py-[0.125rem] text-2xs leading-tight bg-transparent text-disabled",
        variant === "icon-ghost" &&
          "size-5 bg-transparent flex items-center justify-center [&_svg]:size-3",
        className,
      )}
      data-slot="kbd"
      {...props}
    />
  );
}

function KbdGroup({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn("inline-flex items-center gap-1", className)}
      data-slot="kbd-group"
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
