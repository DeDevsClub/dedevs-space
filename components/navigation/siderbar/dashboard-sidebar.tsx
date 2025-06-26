"use client"

import * as React from "react"
import { NavDocuments } from "@/components/navigation/nav-documents"
import { DashboardNavMain } from "@/components/navigation/nav-main"
import { DashboardNavSecondary } from "@/components/navigation/nav-secondary"
import { NavUser } from "@/components/navigation/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Icon } from "@iconify/react"

export function DashboardSidebar() {
  return (
    <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/dashboard">
                <Icon icon="mdi:home" className="!size-5 text-primary" />
                <span className="text-base font-semibold text-primary">
                  DeDevs
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <DashboardNavMain />
        <NavDocuments />
        <DashboardNavSecondary />
      </SidebarContent>
      <SidebarFooter> 
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
 