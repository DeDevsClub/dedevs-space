import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DashboardSidebar } from "@/components/navigation/sidebar/dashboard-sidebar";
// import { SiteHeader } from "@/components/navigation/site-header";
import { SidebarProvider, Sidebar, SidebarToggleButton } from "@/components/ui/sidebar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevFolio - Blockchain & AI Developer Portfolios",
  description: "Showcase your expertise in Blockchain and AI development.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SidebarProvider>
          <SidebarToggleButton />
          <Sidebar>
            <DashboardSidebar username="bunsdev" />
          </Sidebar>
          {/* <SiteHeader /> */}
          <main>{children}</main>
        </SidebarProvider>
      </body>
    </html>
  );
}
