"use client"

import type React from "react"
import ComprehensiveSidebar from "@/components/admin/comprehensive-sidebar"
import CommandPalette from "@/components/admin/command-palette"
import BreadcrumbNav from "@/components/admin/breadcrumb-nav"
import FloatingActionButton from "@/components/admin/floating-action-button"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Bell, User, Sparkles } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[auto_1fr] bg-gradient-to-br from-background via-background to-muted/20">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <ComprehensiveSidebar />
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="shrink-0 lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col p-0 w-64">
              <ComprehensiveSidebar />
            </SheetContent>
          </Sheet>

          {/* Breadcrumb Navigation */}
          <div className="flex-1">
            <BreadcrumbNav />
          </div>

          {/* Command Palette */}
          <div className="hidden md:block">
            <CommandPalette />
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2">
            {/* Fun Welcome Message */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">Welcome back, Dev</span>
            </div>

            {/* Notifications */}
            <Button variant="outline" size="icon" className="h-8 w-8 relative">
              <Bell className="h-4 w-4" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                3
              </Badge>
              <span className="sr-only">Toggle notifications</span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                      Dev Buns
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Dev</p>
                    <p className="text-xs leading-none text-muted-foreground">you@dedevs.space</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sparkles className="mr-2 h-4 w-4" />
                  <span>Upgrade to Pro ✨</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 relative">{children}</main>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  )
}
