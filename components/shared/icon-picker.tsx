"use client";

import { useState, useMemo } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Layers } from "@/components/icons";
import { CATEGORY_ICONS } from "@/lib/icons-map";
import { cn } from "@/lib/utils";

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const AVAILABLE_ICONS = [
  "bracket-curly",
  "mouse-scroll",
  "buttonCursor",
  "cursor",
  "carousel",
  "monitor",
  "map",
  "section",
  "image",
  "handPointer",
  "loader",
  "expand",
  "filterTunel",
  "inputField",
  "easeInOut",
];

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return AVAILABLE_ICONS;
    const query = searchQuery.toLowerCase();
    return AVAILABLE_ICONS.filter((iconKey) =>
      iconKey.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            "min-h-[2.25rem] w-full rounded-10 bg-light border-1 border-border-base px-[0.625rem] text-sm font-book leading-none text-strong outline-none transition-colors duration-100",
            "flex items-center gap-2",
            "hover:border-border-strong",
            open && "border-accent-base",
          )}
        >
          {(() => {
            const SelectedIcon =
              value && CATEGORY_ICONS[value] ? CATEGORY_ICONS[value] : Layers;
            return (
              <SelectedIcon
                className={cn("size-4", value ? "text-soft" : "text-disabled")}
              />
            );
          })()}
          <span className={cn(!value && "text-gray-400")}>
            {value ? capitalize(value) : "Select an icon"}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] overflow-hidden rounded-12 border border-border-base bg-light p-0 shadow-xl"
      >
        <input
          type="text"
          placeholder="Search icons..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-9 w-full bg-light px-3 text-sm font-book text-strong placeholder:text-gray-400 outline-none"
        />
        <div className="h-[0.5px] w-full bg-border-base" />
        <div className="max-h-[200px] overflow-hidden">
          <div className="h-full overflow-y-auto">
            <div className="px-2 py-2">
              <div className="flex flex-wrap">
                {filteredIcons.map((iconKey) => {
                  const Icon = CATEGORY_ICONS[iconKey];
                  const isSelected = value === iconKey;
                  return (
                    <Tooltip key={iconKey}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          onClick={() => {
                            onChange(iconKey);
                            setOpen(false);
                            setSearchQuery("");
                          }}
                          className={cn(
                            "flex size-8 cursor-pointer items-center justify-center rounded-6 transition-colors",
                            isSelected
                              ? "bg-gray-200 text-strong"
                              : "text-soft hover:bg-app hover:text-strong",
                          )}
                        >
                          <Icon className="size-5" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent
                        side="bottom"
                        sideOffset={4}
                        className="rounded-4 bg-slate-800 px-2 py-2 text-2xs font-medium leading-none"
                      >
                        {capitalize(iconKey)}
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
                {filteredIcons.length === 0 && (
                  <p className="w-full py-4 text-center text-sm text-soft">
                    No icons found
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
