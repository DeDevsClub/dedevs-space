"use client"

import type React from "react"

import { useState } from "react"
import { Plus, X, FileText, User, Code, Youtube, Zap, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface QuickAction {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  href: string
  color: string
}

const quickActions: QuickAction[] = [
  {
    id: "add-skill",
    label: "Add Skill",
    icon: Zap,
    href: "/admin/dashboard/skills",
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    id: "add-experience",
    label: "Add Experience",
    icon: User,
    href: "/admin/dashboard/experience",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    id: "add-project",
    label: "Add Project",
    icon: Code,
    href: "/admin/dashboard/projects",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    id: "add-article",
    label: "Add Article",
    icon: FileText,
    href: "/admin/dashboard/content/articles",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    id: "add-video",
    label: "Add Video",
    icon: Youtube,
    href: "/admin/dashboard/content/youtube",
    color: "bg-red-500 hover:bg-red-600",
  },
]

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleActionClick = (href: string) => {
    router.push(href)
    setIsOpen(false)
  }

  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50">
        {/* Quick Action Buttons */}
        <div
          className={cn(
            "flex flex-col-reverse gap-3 mb-3 transition-all duration-300",
            isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none",
          )}
        >
          {quickActions.map((action, index) => (
            <Tooltip key={action.id}>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  className={cn(
                    "h-12 w-12 rounded-full shadow-lg transition-all duration-300",
                    action.color,
                    "transform hover:scale-110 hover:shadow-xl",
                    `animate-in slide-in-from-bottom-2 fade-in duration-300`,
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => handleActionClick(action.href)}
                >
                  <action.icon className="h-5 w-5 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-background border shadow-lg">
                <p className="font-medium">{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        {/* Main FAB */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              className={cn(
                "h-14 w-14 rounded-full shadow-lg transition-all duration-300",
                "bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90",
                "transform hover:scale-110 hover:shadow-xl hover:shadow-primary/25",
                isOpen && "rotate-45",
              )}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6 text-white" /> : <Plus className="h-6 w-6 text-white" />}
              {!isOpen && <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400 animate-pulse" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-background border shadow-lg">
            <p className="font-medium">{isOpen ? "Close menu" : "Quick actions"}</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
