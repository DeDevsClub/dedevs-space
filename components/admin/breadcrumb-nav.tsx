"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { adminNavigation, findNavigationItem } from "@/lib/admin-navigation"

interface BreadcrumbItem {
  title: string
  href?: string
  icon?: React.ComponentType<{ className?: string }>
  isActive?: boolean
}

export default function BreadcrumbNav() {
  const pathname = usePathname()

  // Generate breadcrumb items based on current path
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = pathname.split("/").filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = []

    // Always start with Dashboard
    breadcrumbs.push({
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    })

    // Build breadcrumbs from path segments
    let currentPath = ""
    for (let i = 0; i < pathSegments.length; i++) {
      currentPath += `/${pathSegments[i]}`

      // Skip the first segment if it's 'admin'
      if (pathSegments[i] === "dashboard") continue

      // Find the navigation item for this path
      const navItem = findNavigationItem(adminNavigation, currentPath)

      if (navItem) {
        breadcrumbs.push({
          title: navItem.title,
          href: currentPath,
          icon: navItem.icon,
          isActive: currentPath === pathname,
        })
      } else {
        // Fallback for paths not in navigation
        const title = pathSegments[i]
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")

        breadcrumbs.push({
          title,
          href: currentPath,
          isActive: currentPath === pathname,
        })
      }
    }

    return breadcrumbs
  }

  const breadcrumbs = generateBreadcrumbs()

  if (breadcrumbs.length <= 1) return null

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <div className="flex items-center space-x-1">
        {breadcrumbs.map((item, index) => (
          <div key={item.href || item.title} className="flex items-center space-x-1">
            {index > 0 && <ChevronRight className="h-4 w-4 text-muted-foreground/50 animate-pulse" />}

            {item.href && !item.isActive ? (
              <Link
                href={item.href}
                className={cn(
                  "flex items-center space-x-1.5 px-2 py-1 rounded-md transition-all duration-200",
                  "hover:bg-accent hover:text-accent-foreground hover:scale-105",
                  "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  "group",
                )}
              >
                {item.icon && <item.icon className="h-4 w-4 transition-transform group-hover:rotate-12" />}
                <span className="font-medium">{item.title}</span>
              </Link>
            ) : (
              <div
                className={cn(
                  "flex items-center space-x-1.5 px-2 py-1 rounded-md",
                  item.isActive && "bg-primary/10 text-primary font-semibold",
                )}
              >
                {item.icon && <item.icon className={cn("h-4 w-4", item.isActive && "animate-bounce")} />}
                <span>{item.title}</span>
                {item.isActive && <Sparkles className="h-3 w-3 text-primary animate-pulse" />}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  )
}
