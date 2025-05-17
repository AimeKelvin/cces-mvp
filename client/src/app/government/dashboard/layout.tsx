"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)", // Sidebar width
          "--header-height": "calc(var(--spacing) * 12)", // Header height
        } as React.CSSProperties
      }
    >
      {/* Sidebar */}
      <AppSidebar variant="inset" />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <SiteHeader />

        {/* Page Content */}
        <div className="flex flex-1 flex-col gap-2 p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </SidebarProvider>
  );
}