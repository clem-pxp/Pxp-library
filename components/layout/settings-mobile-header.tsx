"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";

import { ChevronLeft } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/lib/hooks";
import { hasPermission } from "@/lib/permissions";

const generalLinks = [
  { href: "/settings/preferences", label: "Preferences" },
  { href: "/settings/profile", label: "Profile" },
];

const adminLinks = [
  { href: "/settings/workspace", label: "Workspace" },
  { href: "/settings/members", label: "Members" },
  { href: "/settings/components", label: "Components" },
  { href: "/settings/categories", label: "Categories" },
];

export function SettingsMobileHeader() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const isAdmin = user ? hasPermission(user.role, "ADMIN") : false;
  const [hoverItem, setHoverItem] = useState<string | null>(null);

  const navigationItems = isAdmin
    ? [...generalLinks, ...adminLinks]
    : generalLinks;

  return (
    <div className="flex flex-col bg-main shrink-0">
      <header className="flex h-11 items-center justify-between px-2 border-b-[0.5px] border-border-base">
        <Link
          href="/"
          className="flex items-center gap-[0.375rem] px-[0.375rem] text-soft hover:text-strong transition-colors"
        >
          <ChevronLeft className="size-4" />
          <span className="sub-sm text-soft !leading-none">Back to app</span>
        </Link>
      </header>

      <nav className="flex border-b-[0.5px] border-border-base">
        <div
          onMouseLeave={() => setHoverItem(null)}
          className="scrollbar-hide relative flex gap-1 overflow-y-visible overflow-x-scroll whitespace-nowrap px-2 py-1"
        >
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onMouseEnter={() => setHoverItem(item.href)}
                className={cn(
                  "relative flex items-center justify-center px-2 py-2 sub-sm transition-colors",
                  isActive ? "text-strong" : "text-soft",
                )}
              >
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="settings-nav-underline"
                    className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-strong"
                  />
                )}
                {hoverItem === item.href && (
                  <motion.div
                    layoutId="settings-nav-hover"
                    transition={{ duration: 0.15 }}
                    className="absolute inset-0 rounded-6 bg-gray-900/5"
                  />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
