"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ProgressRingProps {
  progress: number // 0-100
  size?: number
  strokeWidth?: number
  className?: string
  children?: React.ReactNode
  animated?: boolean
  color?: string
}

export default function ProgressRing({
  progress,
  size = 120,
  strokeWidth = 8,
  className,
  children,
  animated = true,
  color = "hsl(var(--primary))",
}: ProgressRingProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (animatedProgress / 100) * circumference

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => {
        setAnimatedProgress(progress)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      setAnimatedProgress(progress)
    }
  }, [progress, animated])

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-20"
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn("transition-all duration-1000 ease-out", animated && "animate-pulse")}
          style={{
            filter: "drop-shadow(0 0 6px currentColor)",
          }}
        />
      </svg>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children || <span className="text-2xl font-bold text-foreground">{Math.round(animatedProgress)}%</span>}
      </div>
    </div>
  )
}
