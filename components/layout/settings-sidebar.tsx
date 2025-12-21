"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FilterOptions,
  UserFill,
  Workspace,
  Users,
  Cube,
  Layers,
  ChevronLeft,
} from "@/components/icons";

import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/lib/hooks";
import { hasPermission } from "@/lib/permissions";

const generalLinks = [
  {
    href: "/settings/preferences",
    label: "Preferences",
    icon: FilterOptions,
  },
  {
    href: "/settings/profile",
    label: "Profile",
    icon: UserFill,
  },
];

const administrationLinks = [
  {
    href: "/settings/workspace",
    label: "Workspace",
    icon: Workspace,
  },
  {
    href: "/settings/members",
    label: "Members",
    icon: Users,
  },
];

const componentsLinks = [
  {
    href: "/settings/components",
    label: "Components",
    icon: Cube,
  },
  {
    href: "/settings/categories",
    label: "Categories",
    icon: Layers,
  },
];

interface SettingsSidebarProps {
  className?: string;
}

export function SettingsSidebar({ className }: SettingsSidebarProps) {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const isAdmin = user ? hasPermission(user.role, "ADMIN") : false;

  return (
    <aside className={cn("flex h-full w-[15.25rem] flex-col", className)}>
      {/* Back to app */}
      <div className="flex h-12 items-center pt-2 px-[0.875rem]">
        <Link
          href="/"
          className="flex items-center gap-[0.375rem] px-[0.375rem] text-soft hover:text-strong transition-colors"
        >
          <ChevronLeft className="size-4" />
          <span className="sub-sm text-soft !leading-none">Back to app</span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="flex px-[0.875rem] flex-col pt-3 gap-4">
          {/* General */}
          <div className="flex flex-col gap-1">
            <span className="px-[0.375rem] sub-2xs text-soft">General</span>
            <div className="flex flex-col">
              {generalLinks.map((link) => (
                <SidebarLink
                  key={link.href}
                  href={link.href}
                  icon={<link.icon className="size-4" />}
                  label={link.label}
                  isActive={pathname === link.href}
                />
              ))}
            </div>
          </div>

          {/* Administration (Admin+ only) */}
          {isAdmin && (
            <div className="flex flex-col gap-1">
              <span className="px-[0.375rem] sub-2xs text-soft">
                Administration
              </span>
              <div className="flex flex-col">
                {administrationLinks.map((link) => (
                  <SidebarLink
                    key={link.href}
                    href={link.href}
                    icon={<link.icon className="size-4" />}
                    label={link.label}
                    isActive={pathname === link.href}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Components (Admin+ only) */}
          {isAdmin && (
            <div className="flex flex-col gap-1">
              <span className="px-[0.375rem] sub-2xs text-soft">
                Components
              </span>
              <div className="flex flex-col">
                {componentsLinks.map((link) => (
                  <SidebarLink
                    key={link.href}
                    href={link.href}
                    icon={<link.icon className="size-4" />}
                    label={link.label}
                    isActive={pathname === link.href}
                  />
                ))}
              </div>
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
}

interface SidebarLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function SidebarLink({ href, icon, label, isActive }: SidebarLinkProps) {
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
        <div className="flex flex-row items-center gap-2">
          <span className="flex items-center justify-center">{icon}</span>
          <span className="sub-xs">{label}</span>
        </div>
      </div>
    </Link>
  );
}
