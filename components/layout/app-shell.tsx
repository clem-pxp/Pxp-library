"use client";

import { useEffect } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";
import { SidebarProvider, useSidebar } from "@/components/providers";
import { useIsDesktop } from "@/lib/hooks";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <LayoutGroup>
        <div className="flex h-screen overflow-hidden lg:bg-app bg-main">
          <SidebarWrapper />

          <main className="flex-1 flex overflow-hidden relative">
            {children}
          </main>
        </div>
      </LayoutGroup>
    </SidebarProvider>
  );
}

function SidebarWrapper() {
  const { collapsed, toggle } = useSidebar();
  const isDesktop = useIsDesktop();
  const isMobileOpen = !collapsed && !isDesktop;

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  if (isDesktop) {
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

  return (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-gray-600/20 backdrop-blur-xs"
            onClick={toggle}
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-y-0 left-0 z-50 w-[70%]"
          >
            <Sidebar
              className="border-r border-border-base"
              onToggle={toggle}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
