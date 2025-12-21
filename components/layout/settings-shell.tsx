"use client";

import { SettingsSidebar } from "./settings-sidebar";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export function SettingsShell({ children }: SettingsLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-app">
      <div className="hidden lg:block w-[15.25rem]">
        <SettingsSidebar />
      </div>

      <main className="flex-1 flex overflow-hidden relative">{children}</main>
    </div>
  );
}
