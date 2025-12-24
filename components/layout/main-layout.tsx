"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Header } from "./header";
import { useSidebar } from "@/components/providers";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: "vault";
}

interface MainLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function MainLayout({ children, breadcrumbs }: MainLayoutProps) {
  const { collapsed } = useSidebar();

  return (
    <div
      className={cn(
        "h-full flex-1 lg:py-2 lg:pr-2 flex w-full transition-[padding] duration-200 ease-out",
        collapsed ? "lg:pl-2" : "lg:pl-0",
      )}
    >
      <div className="h-full lg:rounded-8 bg-main lg:border-[0.5px] lg:border-border-base lg:shadow-main flex w-full flex-col overflow-hidden">
        <Header breadcrumbs={breadcrumbs} />
        <ScrollArea className="flex-1 min-h-0">{children}</ScrollArea>
      </div>
    </div>
  );
}
