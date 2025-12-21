"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { ChevronRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface HeaderProps {
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function Header({ className, breadcrumbs = [] }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "flex h-10 items-center justify-between px-2 bg-main border-b-[0.5px] border-border-base",
        className,
      )}
    >
      {/* Left: Breadcrumbs */}
      <nav className="flex flex-row items-center gap-[0.375rem]">
        {breadcrumbs.map((item, index) => (
          <div key={item.href} className="flex items-center gap-[0.375rem]">
            {index > 0 && <ChevronRight className="size-2 text-soft" />}
            <HeaderLink
              href={item.href}
              label={item.label}
              isActive={pathname === item.href}
            />
          </div>
        ))}
      </nav>

      {/* Right: Search + New */}
      <div className="flex flex-row items-center gap-1">
        {/* Command Palette Trigger */}
        <SearchBar />

        {/* Create New */}
        <Button asChild layout="icon">
          <Link href="/components/new">
            <Plus className="size-3.5" />
            <span className="hidden sm:inline">New</span>
          </Link>
        </Button>
      </div>
    </header>
  );
}

interface HeaderLinkProps {
  href: string;
  label: string;
  isActive?: boolean;
}

function HeaderLink({ href, label, isActive }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "sub-xs px-1.5 py-1 rounded-6 transition-colors duration-50",
        isActive ? "text-strong" : "text-soft hover:text-base",
      )}
    >
      {label}
    </Link>
  );
}
