"use client"

import { useState } from "react"
import Link from "next/link"
import { UserCircle, PanelLeftClose, PanelLeftOpen, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { adminNavigation } from "@/lib/admin-navigation"
import SidebarNavItem from "./sidebar-nav-item"
import SidebarSearch from "./sidebar-search"

interface ComprehensiveSidebarProps {
  className?: string
  onItemClick?: () => void
}

export default function ComprehensiveSidebar({ className, onItemClick }: ComprehensiveSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <div
        className={cn(
          "flex h-full flex-col bg-background border-r transition-all duration-300",
          isCollapsed ? "w-16" : "w-64",
          className,
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between px-3 lg:h-[60px]">
          {!isCollapsed && (
            <Link href="/admin/dashboard" className="flex items-center gap-2 font-semibold">
              <UserCircle className="h-6 w-6 text-primary" />
              <span>Admin Panel</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className={cn("h-8 w-8", isCollapsed && "mx-auto")}
          >
            {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>

        <Separator />

        {/* Search */}
        {!isCollapsed && (
          <div className="p-3">
            <SidebarSearch onItemSelect={onItemClick} />
          </div>
        )}

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2 py-2">
            {adminNavigation.map((item) => (
              <SidebarNavItem key={item.id} item={item} isCollapsed={isCollapsed} onItemClick={onItemClick} />
            ))}
          </div>
        </ScrollArea>

        <Separator />

        {/* Footer */}
        <div className="p-3">
          {!isCollapsed ? (
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2" asChild>
                <Link href="/alex-dev" target="_blank">
                  <ExternalLink className="h-4 w-4" />
                    Profile
                </Link>
              </Button>
              <div className="text-xs text-muted-foreground text-center">DevFolio Admin v1.0</div>
            </div>
          ) : (
            <Button variant="outline" size="icon" className="w-full" asChild>
              <Link href="/alex-dev" target="_blank">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
