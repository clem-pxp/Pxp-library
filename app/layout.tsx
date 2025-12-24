import type { Metadata } from "next";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { QueryProvider } from "@/components/providers/query-provider";
import { CommandPaletteProvider } from "@/components/providers/command-palette-provider";
import { AppLoader } from "@/components/providers/app-loader";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "PXP Library",
  description: "Bibliothèque de composants Webflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className="font-sans antialiased lg:bg-app bg-main">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AppLoader>
              <CommandPaletteProvider>{children}</CommandPaletteProvider>
              <Toaster />
            </AppLoader>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
