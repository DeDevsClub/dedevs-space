"use client"

import { useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { GitHubContribution } from "@/lib/github-integration"

interface GitHubContributionGraphProps {
  contributions: GitHubContribution[]
  className?: string
}

const CONTRIBUTION_COLORS = {
  0: "bg-muted",
  1: "bg-green-200 dark:bg-green-900",
  2: "bg-green-300 dark:bg-green-700",
  3: "bg-green-400 dark:bg-green-600",
  4: "bg-green-500 dark:bg-green-500",
}

export default function GitHubContributionGraph({ contributions, className }: GitHubContributionGraphProps) {
  const { weeks, totalContributions, currentStreak } = useMemo(() => {
    // Group contributions by week
    const weeks: GitHubContribution[][] = []
    let currentWeek: GitHubContribution[] = []

    contributions.forEach((contribution, index) => {
      const date = new Date(contribution.date)
      const dayOfWeek = date.getDay()

      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push(currentWeek)
        currentWeek = []
      }

      currentWeek.push(contribution)

      if (index === contributions.length - 1) {
        weeks.push(currentWeek)
      }
    })

    const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0)

    // Calculate current streak
    let streak = 0
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) {
        streak++
      } else {
        break
      }
    }

    return { weeks, totalContributions, currentStreak: streak }
  }, [contributions])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getContributionText = (count: number) => {
    if (count === 0) return "No contributions"
    if (count === 1) return "1 contribution"
    return `${count} contributions`
  }

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>GitHub Contributions</span>
          <span className="text-sm font-normal text-muted-foreground">
            {totalContributions} contributions in the last year
          </span>
        </CardTitle>
        <CardDescription>Current streak: {currentStreak} days 🔥</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Contribution Graph */}
          <div className="overflow-x-auto">
            <div className="flex gap-1 min-w-max">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const contribution = week[dayIndex]
                    if (!contribution) {
                      return <div key={dayIndex} className="w-3 h-3" />
                    }

                    return (
                      <TooltipProvider key={dayIndex}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "w-3 h-3 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer",
                                CONTRIBUTION_COLORS[contribution.level],
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <div className="text-center">
                              <div className="font-medium">{getContributionText(contribution.count)}</div>
                              <div className="text-sm text-muted-foreground">{formatDate(contribution.date)}</div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Less</span>
            <div className="flex gap-1">
              {Object.entries(CONTRIBUTION_COLORS).map(([level, colorClass]) => (
                <div key={level} className={cn("w-3 h-3 rounded-sm", colorClass)} />
              ))}
            </div>
            <span>More</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
