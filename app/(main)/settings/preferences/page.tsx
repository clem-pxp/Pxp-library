"use client";

import { useTheme } from "next-themes";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function PreferencesPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-strong">Preferences</h1>
        <p className="mt-1 text-sm text-soft">Customize your experience</p>
      </div>

      {/* Theme */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="font-medium text-strong">Appearance</h2>
          <p className="text-sm text-soft">Choose how the app looks for you</p>
        </div>

        <div className="flex items-center justify-between rounded-12 border border-border-soft p-4">
          <div className="flex flex-col gap-0.5">
            <Label htmlFor="dark-mode" className="text-base">
              Dark mode
            </Label>
            <span className="text-sm text-soft">
              Use dark theme for the interface
            </span>
          </div>
          <Switch
            id="dark-mode"
            checked={theme === "dark"}
            onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          />
        </div>
      </div>
    </div>
  );
}
