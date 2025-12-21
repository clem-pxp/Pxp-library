'use client';

import { useTheme } from 'next-themes';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Moon } from '@/components/icons/Moon';
import { Sun } from '@/components/icons/Sun';
import { Monitor } from '@/components/icons/Monitor';
import { LightTheme } from '@/components/illustrations/LightTheme';
import { LightThemeSmall } from '@/components/illustrations/LightThemeSmall';
import { DarkTheme } from '@/components/illustrations/DarkTheme';
import { DarkThemeSmall } from '@/components/illustrations/DarkThemeSmall';

export default function PreferencesPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="py-20 px-20">
      <div className="mx-auto w-full max-w-[48rem]">
        <div className="flex flex-col">
          {/* Header */}
          <div className="mb-8">
            <h1 className="sub-3xl text-strong">Preferences</h1>
            <p className="mt-1 text-sm text-soft">Customize your experience</p>
          </div>
          <div className="w-full h-[1px] bg-border-soft mb-10"></div>
          {/* General */}
          <div className="flex flex-col gap-5 mb-10">
            <div>
              <h2 className="sub-base text-base">General</h2>
            </div>

            <div className="bg-light border-[0.5px] border-border-soft rounded-18">
              <div className="px-4 py-3 flex items-center justify-between gap-4 min-h-15">
                <div className="flex flex-col gap-1">
                  <p className="sub-xs text-base">Default home view</p>
                  <p className="text-2xs text-soft">Select which view to display when launching PxP Library</p>
                </div>
              </div>
              <div className="w-full h-[0.5px] bg-border-soft"></div>
              <div className="px-4 py-3 flex items-center justify-between gap-4 min-h-15">
                <div className="flex flex-col gap-1">
                  <p className="sub-xs text-base">Convert text emoticones into emojis</p>
                  <p className="text-2xs text-soft">Strings like :) will be converted to 🙂</p>
                </div>
                <Switch id="dark-mode" checked={theme === 'dark'} onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')} />
              </div>
            </div>
          </div>
          {/* Theme */}
          <div className="flex flex-col gap-5 mb-10">
            <div>
              <h2 className="sub-base text-base">Theme</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="flex p-1 rounded-16 bg-light border-[0.5px] border-border-soft shadow-md cursor-pointer">
                <div className="flex flex-col items-center justify-start gap-1 w-full aspect-[212/112]">
                  <div className="flex bg-main rounded-12 overflow-hidden border-[0.5px] border-border-soft w-full">
                    <LightTheme />
                  </div>
                  <div className="flex items-center justify-center pb-1 pt-[0.125rem] gap-2">
                    <Sun className="size-[0.875rem]" />
                    <p className="text-soft text-xs font-book">Light</p>
                  </div>
                </div>
              </button>
              <button className="flex p-1 rounded-16 bg-light border-[0.5px] border-border-soft shadow-md cursor-pointer">
                <div className="flex flex-col items-center justify-start gap-1 w-full">
                  <div className="flex bg-gray-950 rounded-12 overflow-hidden border-[0.5px] border-border-soft w-full aspect-[212/112]">
                    <DarkTheme />
                  </div>
                  <div className="flex items-center justify-center pb-1 pt-[0.125rem] gap-2">
                    <Moon className="size-[0.875rem]" />
                    <p className="text-soft text-xs font-book">Dark</p>
                  </div>
                </div>
              </button>
              <button className="flex p-1 rounded-16 bg-light border-[0.5px] border-border-soft shadow-md cursor-pointer">
                <div className="flex flex-col items-center justify-start gap-1 w-full">
                  <div className="flex rounded-12 overflow-hidden border-[0.5px] border-border-soft w-full aspect-[212/112]">
                    <div className="flex bg-main border-r-[0.5px] border-border-soft">
                      <LightThemeSmall />
                    </div>
                    <div className="flex bg-gray-950">
                      <DarkThemeSmall />
                    </div>
                  </div>
                  <div className="flex items-center justify-center pb-1 pt-[0.125rem] gap-2">
                    <Monitor className="size-[0.875rem]" />
                    <p className="text-soft text-xs font-book">System</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
