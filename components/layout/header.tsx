"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

import { ChevronRight, SideToggle, Vault } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { SearchBar } from "./search-bar";
import { useSidebar } from "@/components/providers";
import { useIsDesktop } from "@/lib/hooks";

interface BreadcrumbItem {
  label: string;
  href: string;
  icon?: "vault";
}

interface HeaderProps {
  className?: string;
  breadcrumbs?: BreadcrumbItem[];
}

export function Header({ className, breadcrumbs = [] }: HeaderProps) {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebar();
  const isDesktop = useIsDesktop();

  return (
    <header
      className={cn(
        "flex lg:h-10 h-11 items-center justify-between px-2 bg-main border-b-[0.5px] border-border-base shrink-0",
        className,
      )}
    >
      <nav className="flex flex-row items-center gap-[0.375rem]">
        {!isDesktop ? (
          <button
            onClick={toggle}
            className="size-7 flex cursor-pointer items-center justify-center rounded-6 bg-gray-900/4 border-border-soft border-[0.5px]"
          >
            <SideToggle className="size-4 text-soft" isOpen={!collapsed} />
          </button>
        ) : (
          <>
            {collapsed && (
              <motion.button
                layoutId="sidebar-toggle"
                transition={{ duration: 0.2, ease: [0, 0, 0.58, 1] }}
                onClick={toggle}
                className="size-7 flex cursor-pointer items-center justify-center rounded-6 bg-gray-900/4 border-border-soft border-[0.5px]"
              >
                <SideToggle className="size-4 text-soft" isOpen={false} />
              </motion.button>
            )}
            {breadcrumbs.map((item, index) => (
              <div
                key={item.href}
                className="flex h-7 items-center gap-[0.375rem]"
              >
                {index > 0 && <ChevronRight className="size-2 text-soft" />}
                <HeaderLink
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                  isActive={pathname === item.href}
                />
              </div>
            ))}
          </>
        )}
      </nav>

      <div className="flex flex-row items-center gap-1">
        <SearchBar />

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
  );
}

interface HeaderLinkProps {
  href: string;
  label: string;
  icon?: "vault";
  isActive?: boolean;
}

function HeaderLink({ href, label, icon, isActive }: HeaderLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-1.5 px-2 h-7 rounded-8 border-[0.5px] border-border-base transition-colors duration-100",
        isActive
          ? "text-strong"
          : "text-soft hover:text-strong hover:bg-gray-100",
      )}
    >
      {icon === "vault" && <Vault className="size-4" />}
      <span className="sub-xs !leading-none">{label}</span>
    </Link>
  );
}
