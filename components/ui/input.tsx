import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "min-h-[2.25rem] w-full min-w-0 rounded-10 bg-light border-1 border-border-base px-[0.625rem] text-sm font-book leading-none text-strong placeholder:text-gray-400 outline-none transition-colors duration-100",
        "selection:bg-primary selection:text-primary-foreground",
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        "focus:border-accent-base",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-error-base",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
