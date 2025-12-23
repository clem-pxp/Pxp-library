"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import { ChevronRight, SideToggle } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { MobileMenu, MobileMenuButton } from "./mobile-menu";
import { useSidebar } from "@/components/providers";
import { useIsDesktop } from "@/lib/hooks";

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
  const { collapsed, toggle } = useSidebar();
  const isDesktop = useIsDesktop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "flex lg:h-10 h-11 items-center justify-between px-2 bg-main border-b-[0.5px] border-border-base shrink-0",
          className,
        )}
      >
        {/* Left: Toggle + Breadcrumbs */}
        <nav className="flex flex-row items-center gap-[0.375rem]">
          {isDesktop && collapsed && (
            <motion.button
              layoutId="sidebar-toggle"
              transition={{ duration: 0.2, ease: [0, 0, 0.58, 1] }}
              onClick={toggle}
              className="size-6 flex cursor-pointer items-center justify-center rounded-6 bg-gray-900/4 border-border-soft border-[0.5px]"
            >
              <SideToggle className="size-4 text-soft" />
            </motion.button>
          )}
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

        {/* Right: Search + Menu/New */}
        <div className="flex flex-row items-center gap-1">
          <SearchBar />

          {!isDesktop && (
            <MobileMenuButton
              isOpen={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          )}

          {isDesktop && (
            <Button asChild layout="icon">
              <Link href="/components/new">
                <Plus className="size-3.5" />
                <span className="hidden sm:inline">New</span>
              </Link>
            </Button>
          )}
        </div>
      </header>

      {!isDesktop && (
        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />
      )}
    </>
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
