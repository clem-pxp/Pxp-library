import { SettingsNav } from "./settings-nav";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex-1 p-2 flex">
      <div className="h-full rounded-8 bg-main border-[0.5px] border-border-base shadow-main flex w-full overflow-hidden">
        <SettingsNav />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-2xl px-8 py-8">{children}</div>
        </div>
      </div>
    </div>
  );
}
