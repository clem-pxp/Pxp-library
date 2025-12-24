"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  toggle: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

function subscribeToMediaQuery(callback: () => void) {
  const media = window.matchMedia("(min-width: 1024px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getIsDesktop() {
  return window.matchMedia("(min-width: 1024px)").matches;
}

function getServerSnapshot() {
  return false;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const isDesktop = useSyncExternalStore(
    subscribeToMediaQuery,
    getIsDesktop,
    getServerSnapshot,
  );
  const [collapsed, setCollapsed] = useState(!isDesktop);

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        toggle: () => setCollapsed((prev) => !prev),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
