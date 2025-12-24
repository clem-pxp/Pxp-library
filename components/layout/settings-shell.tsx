"use client";

import { useIsDesktop } from "@/lib/hooks";
import { SettingsSidebar } from "./settings-sidebar";
import { SettingsMobileHeader } from "./settings-mobile-header";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsShell({ children }: SettingsLayoutProps) {
  const isDesktop = useIsDesktop();

  return (
    <div className="flex flex-col h-screen overflow-hidden lg:bg-app bg-main">
      {!isDesktop && <SettingsMobileHeader />}
      <div className="flex flex-1 overflow-hidden">
        {isDesktop && (
          <div className="w-[15.25rem]">
            <SettingsSidebar />
          </div>
        )}
        <main className="flex-1 flex overflow-hidden relative">{children}</main>
      </div>
    </div>
  );
}
