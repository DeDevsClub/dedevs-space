"use client"

import type React from "react"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  User,
  FileText,
  Youtube,
  Code,
  Palette,
  BarChart3,
  Zap,
  Rocket,
  Sparkles,
  Coffee,
  Heart,
} from "lucide-react"
import { adminNavigation, getAllNavigationItems } from "@/lib/admin-navigation"

interface QuickAction {
  id: string
  title: string
  description?: string
  icon: React.ComponentType<{ className?: string }>
  action: () => void
  category: string
  keywords?: string[]
  badge?: string
}

interface CommandPaletteProps {
  onOpenChange?: (open: boolean) => void
}

export default function CommandPalette({ onOpenChange }: CommandPaletteProps) {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  // Quick actions configuration
  const quickActions: QuickAction[] = useMemo(
    () => [
      // Create Actions
      {
        id: "create-skill",
        title: "Add New Skill",
        description: "Showcase your expertise",
        icon: Zap,
        action: () => router.push("/dashboard/skills"),
        category: "Create",
        keywords: ["skill", "expertise", "technology"],
        badge: "⚡",
      },
      {
        id: "create-experience",
        title: "Add Work Experience",
        description: "Share your professional journey",
        icon: User,
        action: () => router.push("/dashboard/experience"),
        category: "Create",
        keywords: ["work", "job", "career"],
        badge: "💼",
      },
      {
        id: "create-article",
        title: "Add Article",
        description: "Share your knowledge",
        icon: FileText,
        action: () => router.push("/dashboard/content/articles"),
        category: "Create",
        keywords: ["blog", "post", "write"],
        badge: "📝",
      },
      {
        id: "create-video",
        title: "Add YouTube Video",
        description: "Showcase your tutorials",
        icon: Youtube,
        action: () => router.push("/dashboard/content/youtube"),
        category: "Create",
        keywords: ["video", "tutorial", "youtube"],
        badge: "🎥",
      },
      {
        id: "sync-projects",
        title: "Sync GitHub Projects",
        description: "Import your latest repositories",
        icon: Code,
        action: () => router.push("/dashboard/projects"),
        category: "Create",
        keywords: ["github", "repository", "project"],
        badge: "🔄",
      },

      // Quick Navigation
      {
        id: "view-profile",
        title: "View Public Profile",
        description: "See how others see you",
        icon: Rocket,
        action: () => window.open("/profile/bunsdev", "_blank"),
        category: "Navigate",
        keywords: ["profile", "public", "view"],
        badge: "🚀",
      },
      {
        id: "customize-page",
        title: "Customize Design",
        description: "Make your profile unique",
        icon: Palette,
        action: () => router.push("/dashboard/customize"),
        category: "Navigate",
        keywords: ["design", "css", "theme"],
        badge: "🎨",
      },
      {
        id: "analytics",
        title: "View Analytics",
        description: "Track your profile performance",
        icon: BarChart3,
        action: () => router.push("/dashboard/analytics/views"),
        category: "Navigate",
        keywords: ["stats", "views", "analytics"],
        badge: "📊",
      },

      // Fun Actions
      {
        id: "surprise-me",
        title: "Surprise Me!",
        description: "Random profile enhancement tip",
        icon: Sparkles,
        action: () => {
          const tips = [
            "Add a fun emoji to your tagline! 🚀",
            "Try customizing your profile colors! 🌈",
            "Share a recent project you're proud of! ⭐",
            "Update your bio with a fun fact! 🎉",
            "Add your latest YouTube video! 📹",
          ]
          const randomTip = tips[Math.floor(Math.random() * tips.length)]
          alert(`💡 Pro Tip: ${randomTip}`)
        },
        category: "Fun",
        keywords: ["tip", "random", "surprise"],
        badge: "✨",
      },
      {
        id: "coffee-break",
        title: "Take a Coffee Break",
        description: "You deserve it! ☕",
        icon: Coffee,
        action: () => {
          alert("☕ Great idea! Take a 5-minute break and come back refreshed! 🌟")
        },
        category: "Fun",
        keywords: ["break", "coffee", "relax"],
        badge: "☕",
      },
      {
        id: "motivation",
        title: "Daily Motivation",
        description: "Get inspired to code",
        icon: Heart,
        action: () => {
          const quotes = [
            "Code is poetry written in logic! 💻✨",
            "Every expert was once a beginner! 🌱",
            "Your next commit could change the world! 🌍",
            "Debugging is like being a detective! 🔍",
            "Keep calm and code on! 😎",
          ]
          const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
          alert(`💪 ${randomQuote}`)
        },
        category: "Fun",
        keywords: ["motivation", "inspiration", "quote"],
        badge: "💪",
      },
    ],
    [router],
  )

  // Navigation items from sidebar
  const navigationItems = useMemo(() => getAllNavigationItems(adminNavigation), [])

  // Keyboard shortcut
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  // Handle open change
  useEffect(() => {
    onOpenChange?.(open)
  }, [open, onOpenChange])

  const handleAction = (action: () => void) => {
    action()
    setOpen(false)
  }

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden lg:inline-flex">Search or run command...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {/* Command Dialog */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." className="h-12" />
        <CommandList className="max-h-[400px]">
          <CommandEmpty className="py-6 text-center text-sm">
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
              <span>No results found.</span>
              <span className="text-xs text-muted-foreground">Try searching for something else!</span>
            </div>
          </CommandEmpty>

          {/* Quick Actions */}
          <CommandGroup heading="🚀 Quick Actions">
            {quickActions
              .filter((action) => action.category === "Create")
              .map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => handleAction(action.action)}
                  className="flex items-center gap-3"
                >
                  <action.icon className="h-4 w-4" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{action.title}</span>
                      {action.badge && <span className="text-xs">{action.badge}</span>}
                    </div>
                    {action.description && <div className="text-xs text-muted-foreground">{action.description}</div>}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Navigation */}
          <CommandGroup heading="🧭 Navigate">
            {quickActions
              .filter((action) => action.category === "Navigate")
              .map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => handleAction(action.action)}
                  className="flex items-center gap-3"
                >
                  <action.icon className="h-4 w-4" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{action.title}</span>
                      {action.badge && <span className="text-xs">{action.badge}</span>}
                    </div>
                    {action.description && <div className="text-xs text-muted-foreground">{action.description}</div>}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator />

          {/* Fun Actions */}
          <CommandGroup heading="🎉 Just for Fun">
            {quickActions
              .filter((action) => action.category === "Fun")
              .map((action) => (
                <CommandItem
                  key={action.id}
                  onSelect={() => handleAction(action.action)}
                  className="flex items-center gap-3"
                >
                  <action.icon className="h-4 w-4" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span>{action.title}</span>
                      {action.badge && <span className="text-xs">{action.badge}</span>}
                    </div>
                    {action.description && <div className="text-xs text-muted-foreground">{action.description}</div>}
                  </div>
                </CommandItem>
              ))}
          </CommandGroup>

          <CommandSeparator />

          {/* All Pages */}
          <CommandGroup heading="📄 All Pages">
            {navigationItems.map((item) => (
              <CommandItem
                key={item.id}
                onSelect={() => handleAction(() => router.push(item.href!))}
                className="flex items-center gap-3"
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                <div className="flex-1">
                  <span>{item.title}</span>
                  {item.description && <div className="text-xs text-muted-foreground">{item.description}</div>}
                </div>
                {item.badge && (
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
