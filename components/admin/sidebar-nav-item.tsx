"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import type { NavigationItem } from "@/lib/admin-navigation"
import { shouldExpandSection } from "@/lib/admin-navigation"

interface SidebarNavItemProps {
  item: NavigationItem
  level?: number
  isCollapsed?: boolean
  onItemClick?: () => void
}

export default function SidebarNavItem({ item, level = 0, isCollapsed = false, onItemClick }: SidebarNavItemProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(item.defaultOpen ?? shouldExpandSection(item, pathname))

  const isActive = item.href === pathname
  const hasChildren = item.children && item.children.length > 0
  const isParentActive =
    hasChildren &&
    item?.children?.some((child) => child.href === pathname || (child.children && shouldExpandSection(child, pathname)))

  // If item has no href and no children, don't render
  if (!item.href && !hasChildren) return null

  const handleToggle = () => {
    if (hasChildren && item.isCollapsible) {
      setIsOpen(!isOpen)
    }
  }

  const handleItemClick = () => {
    onItemClick?.()
  }

  // Render collapsible section
  if (hasChildren && item.isCollapsible) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className={cn("space-y-1", level > 0 && "ml-4")}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 h-9 px-2 font-normal",
                isParentActive && "bg-accent text-accent-foreground",
                isCollapsed && "justify-center px-2",
              )}
              onClick={handleToggle}
            >
              {item.icon && <item.icon className={cn("h-4 w-4", isCollapsed && "h-5 w-5")} />}
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{item.title}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                  <ChevronRight className={cn("h-4 w-4 transition-transform", isOpen && "rotate-90")} />
                </>
              )}
            </Button>
          </CollapsibleTrigger>

          {!isCollapsed && (
            <CollapsibleContent className="space-y-1">
              <div className="ml-4 space-y-1">
                {item.children?.map((child) => (
                  <SidebarNavItem
                    key={child.id}
                    item={child}
                    level={level + 1}
                    isCollapsed={isCollapsed}
                    onItemClick={onItemClick}
                  />
                ))}
              </div>
            </CollapsibleContent>
          )}
        </div>
      </Collapsible>
    )
  }

  // Render regular navigation item
  const NavButton = (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 h-9 px-2 font-normal",
        isActive && "bg-accent text-accent-foreground font-medium",
        isCollapsed && "justify-center px-2",
        level > 0 && !isCollapsed && "ml-4",
      )}
      asChild={!!item.href}
      onClick={item.href ? handleItemClick : undefined}
    >
      {item.href ? (
        <Link href={item.href}>
          {item.icon && <item.icon className={cn("h-4 w-4", isCollapsed && "h-5 w-5")} />}
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </Link>
      ) : (
        <>
          {item.icon && <item.icon className={cn("h-4 w-4", isCollapsed && "h-5 w-5")} />}
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </>
          )}
        </>
      )}
    </Button>
  )

  // Wrap with tooltip when collapsed
  if (isCollapsed && item.title) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{NavButton}</TooltipTrigger>
          <TooltipContent side="right" className="flex items-center gap-4">
            <span>{item.title}</span>
            {item.badge && (
              <Badge variant="secondary" className="text-xs">
                {item.badge}
              </Badge>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return NavButton
}
