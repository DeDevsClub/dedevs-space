"use client";

import * as React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import { Icon } from "@iconify/react";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <div className="flex flex-cols bg-muted rounded-md w-full justify-center sm:justify-start items-center gap-6 sm:gap-12 p-4 hover:bg-accent cursor-pointer transition-colors">
        <Link href="/dashboard">
          <Icon icon="mdi:home" className="!size-5 text-primary" />
        </Link>
        <div className="text-md sm:text-lg font-semibold text-primary">Dashboard</div>
      </div>
    </Sidebar>
  );
}
