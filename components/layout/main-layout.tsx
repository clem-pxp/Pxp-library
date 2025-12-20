import { Header } from "./header";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface MainLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: BreadcrumbItem[];
}

export function MainLayout({ children, breadcrumbs }: MainLayoutProps) {
  return (
    <div className="h-full flex-1 p-2 flex">
      <div className="h-full rounded-8 bg-main border-[0.5px] border-border-base shadow-main flex w-full flex-col overflow-hidden">
        <Header breadcrumbs={breadcrumbs} />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
