"use client";

import { useState } from "react";
import { LayoutGroup } from "motion/react";
import { Sidebar } from "./sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SidebarProvider, useSidebar } from "@/components/providers";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <SidebarProvider>
      <LayoutGroup>
        <div className="flex h-screen overflow-hidden lg:bg-app bg-main">
          <SidebarContainer />

          <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
            <SheetContent side="left" className="w-60 p-0">
              <Sidebar />
            </SheetContent>
          </Sheet>

          <main className="flex-1 flex overflow-hidden relative">
            {children}
          </main>
        </div>
      </LayoutGroup>
    </SidebarProvider>
  );
}

function SidebarContainer() {
  const { collapsed, toggle } = useSidebar();

  return (
    <div
      className={cn(
        "hidden lg:block transition-all duration-200 ease-out",
        collapsed ? "w-0" : "w-[15.25rem]",
      )}
    >
      <Sidebar
        className={cn(
          "transition-transform duration-200 ease-out",
          collapsed ? "-translate-x-full" : "translate-x-0",
        )}
        onToggle={toggle}
      />
    </div>
  );
}
