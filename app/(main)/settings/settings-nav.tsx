"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Settings } from "@/components/icons/Settings";
import { User, Palette, Users, FolderOpen, LayoutGrid } from "lucide-react";
import { useCurrentUser } from "@/lib/hooks";
import { hasPermission } from "@/lib/permissions";

const generalLinks = [
  {
    href: "/settings/preferences",
    label: "Preferences",
    icon: Palette,
  },
  {
    href: "/settings/profile",
    label: "Profile",
    icon: User,
  },
];

const adminLinks = [
  {
    href: "/settings/categories",
    label: "Categories",
    icon: FolderOpen,
  },
  {
    href: "/settings/members",
    label: "Members",
    icon: Users,
  },
  {
    href: "/settings/components",
    label: "Components",
    icon: LayoutGrid,
  },
];

export function SettingsNav() {
  const pathname = usePathname();
  const { data: user } = useCurrentUser();
  const isAdmin = user ? hasPermission(user.role, "ADMIN") : false;

  return (
    <aside className="w-56 border-r border-border-soft bg-main">
      <div className="flex flex-col gap-6 p-4">
        {/* Header */}
        <div className="flex items-center gap-2 px-2">
          <Settings className="size-4 text-soft" />
          <span className="font-medium text-strong">Settings</span>
        </div>

        {/* General */}
        <div className="flex flex-col gap-1">
          <span className="px-2 text-xs font-medium uppercase text-soft">
            General
          </span>
          <nav className="flex flex-col gap-0.5">
            {generalLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                icon={link.icon}
                isActive={pathname === link.href}
              />
            ))}
          </nav>
        </div>

        {/* Administration (Admin+ only) */}
        {isAdmin && (
          <div className="flex flex-col gap-1">
            <span className="px-2 text-xs font-medium uppercase text-soft">
              Administration
            </span>
            <nav className="flex flex-col gap-0.5">
              {adminLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  icon={link.icon}
                  isActive={pathname === link.href}
                />
              ))}
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
}

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

function NavLink({ href, label, icon: Icon, isActive }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2 rounded-8 px-2 py-1.5 text-sm transition-colors",
        isActive
          ? "bg-gray-200 text-strong"
          : "text-base hover:bg-gray-100 hover:text-strong",
      )}
    >
      <Icon className="size-4" />
      <span>{label}</span>
    </Link>
  );
}
