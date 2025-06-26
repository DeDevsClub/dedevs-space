"use client"

import { useState, useMemo } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { adminNavigation, getAllNavigationItems } from "@/lib/admin-navigation"
import Link from "next/link"

interface SidebarSearchProps {
  onItemSelect?: () => void
}

export default function SidebarSearch({ onItemSelect }: SidebarSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const allItems = useMemo(() => getAllNavigationItems(adminNavigation), [])

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return allItems
      .filter((item) => item.title.toLowerCase().includes(query) || item.description?.toLowerCase().includes(query))
      .slice(0, 8) // Limit results
  }, [searchQuery, allItems])

  const clearSearch = () => {
    setSearchQuery("")
    setIsSearchFocused(false)
  }

  const handleItemClick = () => {
    clearSearch()
    onItemSelect?.()
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search navigation..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          className="pl-8 pr-8 h-9"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
            onClick={clearSearch}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isSearchFocused && searchQuery && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setIsSearchFocused(false)} />

          {/* Results */}
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-background border rounded-md shadow-lg">
            <ScrollArea className="max-h-64">
              {filteredItems.length > 0 ? (
                <div className="p-2">
                  {filteredItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href!}
                      onClick={handleItemClick}
                      className="flex items-center gap-3 p-2 rounded-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {item.icon && <item.icon className="h-4 w-4 text-muted-foreground" />}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{item.title}</div>
                        {item.description && (
                          <div className="text-xs text-muted-foreground truncate">{item.description}</div>
                        )}
                      </div>
                      {item.badge && (
                        <Badge variant="secondary" className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-muted-foreground">
                  No results found for "{searchQuery}"
                </div>
              )}
            </ScrollArea>
          </div>
        </>
      )}
    </div>
  )
}
