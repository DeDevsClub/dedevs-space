"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Sparkles, TrendingUp, Zap } from "lucide-react"

interface DashboardCardProps {
  title: string
  description?: string
  value: string | number
  change?: string
  icon: React.ComponentType<{ className?: string }>
  trend?: "up" | "down" | "neutral"
  onClick?: () => void
  className?: string
  gradient?: boolean
  sparkle?: boolean
}

export default function DashboardCard({
  title,
  description,
  value,
  change,
  icon: Icon,
  trend = "neutral",
  onClick,
  className,
  gradient = false,
  sparkle = false,
}: DashboardCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  const handleClick = () => {
    if (onClick) {
      setIsClicked(true)
      setTimeout(() => setIsClicked(false), 200)
      onClick()
    }
  }

  const trendColor = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-muted-foreground",
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 cursor-pointer group",
        "hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-1",
        isClicked && "scale-95",
        gradient && "bg-gradient-to-br from-primary/5 via-background to-secondary/5",
        onClick && "hover:border-primary/50",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Sparkle Effect */}
      {sparkle && isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          <Sparkles className="absolute top-2 right-2 h-4 w-4 text-primary animate-pulse" />
          <Sparkles className="absolute bottom-4 left-4 h-3 w-3 text-secondary animate-pulse delay-300" />
          <Sparkles className="absolute top-1/2 left-1/2 h-2 w-2 text-accent animate-pulse delay-700" />
        </div>
      )}

      {/* Gradient Overlay */}
      {gradient && isHovered && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50 transition-opacity duration-300" />
      )}

      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn("transition-all duration-300", isHovered && "scale-110 rotate-12")}>
          <Icon
            className={cn("h-4 w-4 text-muted-foreground transition-colors duration-300", isHovered && "text-primary")}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold transition-all duration-300 group-hover:text-primary">{value}</div>
        {change && (
          <div
            className={cn(
              "flex items-center text-xs transition-all duration-300",
              trendColor[trend],
              isHovered && "scale-105",
            )}
          >
            {trend === "up" && <TrendingUp className="mr-1 h-3 w-3" />}
            {trend === "down" && <TrendingUp className="mr-1 h-3 w-3 rotate-180" />}
            {trend === "neutral" && <Zap className="mr-1 h-3 w-3" />}
            {change}
          </div>
        )}
        {description && (
          <p className="text-xs text-muted-foreground mt-1 transition-all duration-300 group-hover:text-foreground/80">
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
