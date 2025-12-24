"use client";

import * as React from "react";
import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { snap } from "@/lib/motion";

function Switch({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  ...props
}: SwitchPrimitive.Root.Props) {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange: SwitchPrimitive.Root.Props["onCheckedChange"] = (
    value,
    eventDetails,
  ) => {
    if (!isControlled) {
      setInternalChecked(value);
    }
    onCheckedChange?.(value, eventDetails);
  };

  return (
    <SwitchPrimitive.Root
      className={cn(
        "group/switch relative inline-flex h-5 w-[50px] shrink-0 cursor-pointer items-center rounded-full transition-all",
        "bg-gray-900/10 data-checked:bg-blue-500",
        "shadow-[inset_0_6px_12px_0_rgba(0,0,0,0.02),inset_0_0.75px_0.75px_0_rgba(0,0,0,0.02),inset_0_0.25px_0.25px_0_rgba(0,0,0,0.04)]",
        "data-checked:shadow-[inset_0_6px_12px_0_rgba(38,109,240,0.12),inset_0_0.75px_0.75px_0_rgba(38,109,240,0.06),inset_0_0.25px_0.25px_0_rgba(38,109,240,0.06)]",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
      checked={isChecked}
      onCheckedChange={handleChange}
      data-slot="switch"
      {...props}
    >
      <motion.span
        className={cn(
          "pointer-events-none absolute left-0.5 top-0.5 block h-4 w-7 rounded-full bg-light",
          "shadow-[0_6px_12px_-3px_rgba(0,0,0,0.06),0_3px_6px_-1px_rgba(0,0,0,0.06),0_1px_2px_0_rgba(0,0,0,0.04),0_0.5px_0.5px_0_rgba(0,0,0,0.08)]",
          isChecked &&
            "shadow-[0_6px_12px_-3px_rgba(38,109,240,0.3),0_3px_6px_-1px_rgba(38,109,240,0.12),0_1px_2px_0_rgba(38,109,240,0.12),0_0.5px_0.5px_0_rgba(38,109,240,0.24)]",
        )}
        animate={{ x: isChecked ? 18 : 0 }}
        transition={snap}
        data-slot="switch-thumb"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
