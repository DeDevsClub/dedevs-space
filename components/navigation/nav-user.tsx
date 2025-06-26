"use client"

import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 bg-muted text-muted-background p-2 rounded-lg w-full">
          <div className={"auth-button"}>{'Sign In'}</div>
          <div className={"auth-button"}>{'Sign Up'}</div>
        </div>
        <div className="flex items-center gap-2 bg-muted text-muted-background p-2 rounded-lg w-full">
          {'email@example.com'}
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
