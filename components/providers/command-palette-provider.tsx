"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { CommandPalette } from "@/components/features/command-palette";

interface CommandPaletteContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const CommandPaletteContext = createContext<
  CommandPaletteContextValue | undefined
>(undefined);

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      "useCommandPalette must be used within CommandPaletteProvider",
    );
  }
  return context;
}

interface CommandPaletteProviderProps {
  children: ReactNode;
}

const SUGGESTION_SHORTCUTS: Record<string, string> = {
  "1": "/",
  "2": "/favorites",
  "3": "/components/new",
};

export function CommandPaletteProvider({
  children,
}: CommandPaletteProviderProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        toggle();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        e.preventDefault();
        e.stopPropagation();
        setOpen(false);
      }
    };

    const handleShortcuts = (e: KeyboardEvent) => {
      if (e.altKey && SUGGESTION_SHORTCUTS[e.key]) {
        e.preventDefault();
        setOpen(false);
        router.push(SUGGESTION_SHORTCUTS[e.key]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", handleEscape, true);
    document.addEventListener("keydown", handleShortcuts);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", handleEscape, true);
      document.removeEventListener("keydown", handleShortcuts);
    };
  }, [toggle, open, router]);

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen, toggle }}>
      {children}
      <CommandPalette />
    </CommandPaletteContext.Provider>
  );
}
