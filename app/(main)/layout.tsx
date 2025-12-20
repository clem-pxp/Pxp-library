import { AppLayout } from "@/components/layout";

export default function RootMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
