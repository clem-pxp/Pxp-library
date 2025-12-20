import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center !cursor-pointer !leading-none justify-center gap-1 whitespace-nowrap sub-2xs transition-all duration-100 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none active:scale-[0.97] rounded-8",
  {
    variants: {
      // Color variants
      color: {
        blue: "shadow-btn bg-blue-500 border-[0.5px] border-blue-400 text-light hover:bg-blue-700 hover:border-blue-500",
        destructive:
          "shadow-btn bg-red-500 border border-red-400 text-light hover:bg-red-700 hover:border-red-500",
        outline:
          "border border-border-base bg-main shadow-sm hover:bg-gray-100 text-base",
        secondary: "bg-gray-200 text-base hover:bg-gray-300",
        ghost: "hover:bg-gray-100 text-base",
        link: "text-blue-500 underline-offset-4 hover:underline",
      },
      // Structure variants (padding)
      structure: {
        default: "px-[0.625rem]",
        keyboard: "pl-2 pr-[0.375rem]",
        icon: "pl-2 pr-[0.625rem]",
        "icon-only": "p-0 aspect-square",
      },
      // Size variants (height)
      size: {
        default: "h-7",
        sm: "h-6 text-xs",
        large: "h-8 rounded-10",
      },
    },
    defaultVariants: {
      color: "blue",
      structure: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  color = "blue",
  structure = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-color={color}
      data-structure={structure}
      data-size={size}
      className={cn(buttonVariants({ color, structure, size }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
