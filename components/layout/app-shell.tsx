"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SideToggle } from "@/components/icons";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-app">
      <div
        className={cn(
          "hidden lg:block transition-all duration-200 ease-out",
          sidebarCollapsed ? "w-0" : "w-[15.25rem]",
        )}
      >
        <Sidebar
          className={cn(
            "transition-transform duration-200 ease-out",
            sidebarCollapsed ? "-translate-x-full" : "translate-x-0",
          )}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      <button
        onClick={() => setSidebarCollapsed(false)}
        className={cn(
          "fixed left-4 top-4 z-50 hidden size-8 items-center justify-center rounded-8 bg-light shadow-sm border-border-soft border-[0.5px] transition-all duration-200",
          sidebarCollapsed ? "lg:flex" : "lg:hidden",
        )}
      >
        <SideToggle className="size-4 text-soft" />
      </button>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-60 p-0">
          <Sidebar />
        </SheetContent>
      </Sheet>

      <main className="flex-1 flex overflow-hidden relative">{children}</main>
    </div>
  );
}
