import { SettingsShell } from "@/components/layout";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SettingsShell>
      <div className="h-full flex-1 lg:py-2 lg:pr-2 py-0 pl-0 flex w-full">
        <div className="h-full lg:rounded-8 bg-main lg:border-[0.5px] lg:border-border-base lg:shadow-sm flex w-full overflow-hidden">
          <ScrollArea className="flex-1">{children}</ScrollArea>
        </div>
      </div>
    </SettingsShell>
  );
}
