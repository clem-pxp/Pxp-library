import { SettingsShell } from "@/components/layout";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsShell>
      <div className="h-full flex-1 p-2 flex w-full">
        <div className="h-full rounded-8 bg-main border-[0.5px] border-border-base shadow-sm flex w-full overflow-hidden">
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </SettingsShell>
  );
}
