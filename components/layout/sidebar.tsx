"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings } from "@/components/icons/Settings";
import { UserPlus } from "@/components/icons/UserPlus";
import { Out } from "@/components/icons/Out";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useCategories } from "@/lib/hooks";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThreeDCube } from "@/components/icons/ThreeDCube";
import { ChevronDown } from "@/components/icons/ChevronDown";
import { SideToggle } from "@/components/icons/SideToggle";
import { Vault } from "@/components/icons/Vault";
import { Heart } from "@/components/icons/Heart";
import { TriangleDown } from "@/components/icons/TriangleDown";
import { getCategoryIcon } from "@/lib/icons-map";
import type { CategoryWithCount } from "@/lib/data/categories";

interface SidebarProps {
  className?: string;
  onToggle?: () => void;
}

export function Sidebar({ className, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const { data: categories = [] } = useCategories();

  return (
    <aside className={cn("flex h-full w-[15.25rem] flex-col", className)}>
      {/* Logo + User Menu */}
      <div className="flex h-12 items-center pt-2 px-[0.875rem] justify-between w-full">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-[0.375rem] px-[0.375rem] hover:opacity-80 transition-opacity">
              <div className="flex size-5 items-center justify-center rounded-6 bg-fade-dark">
                <ThreeDCube className="size-4 text-light" />
              </div>
              <span className="sub-sm text-strong">PxP</span>
              <ChevronDown className="size-2 text-soft" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <div className="flex items-center gap-2">
                    <Settings className="size-4" />
                    <span>Settings</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings/members">
                  <div className="flex items-center gap-2">
                    <UserPlus className="size-4" />
                    <span>Invite members</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <div className="flex items-center gap-2">
                  <Out className="size-4" />
                  <span>Sign out</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <button
          onClick={onToggle}
          className="size-6 flex items-center justify-center rounded-6 bg-light shadow-sm border-border-soft border-[0.5px]"
        >
          <SideToggle className="size-4 text-soft" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="flex px-[0.875rem] flex-col py-1 gap-1">
          {/* Home */}
          <div className="pb-2">
            <SidebarLink
              href="/"
              icon={<Vault className="size-4" />}
              label="The Vault"
              isActive={pathname === "/"}
            />
            <SidebarLink
              href="/favorites"
              icon={<Heart className="size-4" />}
              label="Favorites"
              isActive={pathname === "/favorites"}
            />
          </div>

          {/* Categories Section */}
          <CategoriesAccordion categories={categories} pathname={pathname} />
        </nav>
      </div>

      {/* Settings (bottom) */}
      <div className="border-t border-border-soft p-2">
        <SidebarLink
          href="/settings"
          icon={<Settings className="size-4" />}
          label="Settings"
          isActive={pathname.startsWith("/settings")}
        />
      </div>
    </aside>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  count?: number;
}

function SidebarLink({ href, icon, label, isActive, count }: SidebarLinkProps) {
  return (
    <Link href={href} className="group block py-[1px]">
      <div
        className={cn(
          "flex h-8 items-center justify-between rounded-8 pl-[0.375rem] pr-1 transition-[color,background-color] duration-50",
          isActive
            ? "bg-gray-300 text-strong"
            : "text-soft hover:bg-gray-300/60",
        )}
      >
        {/* Left: icon + label */}
        <div className="flex flex-row items-center gap-2">
          <span className="flex items-center justify-center">{icon}</span>
          <span className="sub-xs">{label}</span>
        </div>

        {/* Right: counter (visible on active or hover) */}
        {count !== undefined && (
          <span
            className={cn(
              "px-[0.375rem] py-[0.1875rem] rounded-4 bg-gray-300 sub-3xs transition-opacity",
              isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            {count}
          </span>
        )}
      </div>
    </Link>
  );
}

interface CategoriesAccordionProps {
  categories: CategoryWithCount[];
  pathname: string;
}

function CategoriesAccordion({
  categories,
  pathname,
}: CategoriesAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center px-[0.375rem] h-6 sub-2xs text-soft hover:text-base transition-colors duration-100"
      >
        <span>Categories</span>
        <motion.span
          animate={{ rotateX: isOpen ? 0 : 180 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <TriangleDown className="size-4" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col pb-2 pl-1">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.icon);
                return (
                  <SidebarLink
                    key={category.id}
                    href={`/category/${category.slug}`}
                    icon={<Icon className="size-4" />}
                    label={category.name}
                    isActive={pathname === `/category/${category.slug}`}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
