"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { ACHIEVEMENT_TIERS, Achievement, UserAchievement } from "@/lib/achievements"
import { Lock, Sparkles } from "lucide-react"

interface AchievementBadgeProps {
  achievement: Achievement
  userAchievement: UserAchievement
  size?: "sm" | "md" | "lg"
  showProgress?: boolean
  onClick?: () => void
}

export default function AchievementBadge({
  achievement,
  userAchievement,
  size = "md",
  showProgress = true,
  onClick,
}: AchievementBadgeProps) {
  const [isHovered, setIsHovered] = useState(false)
  const isUnlocked = userAchievement.isCompleted
  const progressPercentage = (userAchievement.progress / userAchievement.maxProgress) * 100

  const sizeClasses = {
    sm: "w-16 h-16",
    md: "w-20 h-20",
    lg: "w-24 h-24",
  }

  const iconSizes = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const tierInfo = ACHIEVEMENT_TIERS[achievement.tier]

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Card
            className={cn(
              "relative overflow-hidden transition-all duration-300 cursor-pointer group",
              sizeClasses[size],
              "flex items-center justify-center",
              isUnlocked ? "hover:scale-110 hover:shadow-lg hover:shadow-primary/25" : "opacity-60 hover:opacity-80",
              onClick && "hover:border-primary/50",
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
          >
            {/* Background Gradient */}
            <div
              className={cn(
                "absolute inset-0 opacity-20 transition-opacity duration-300",
                isUnlocked
                  ? `bg-gradient-to-br ${achievement.gradient}`
                  : "bg-gradient-to-br from-gray-400 to-gray-600",
                isHovered && isUnlocked && "opacity-40",
              )}
            />

            {/* Sparkle Effect for Unlocked Achievements */}
            {isUnlocked && isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                <Sparkles className="absolute top-1 right-1 h-3 w-3 text-yellow-400 animate-pulse" />
                <Sparkles className="absolute bottom-1 left-1 h-2 w-2 text-yellow-400 animate-pulse delay-300" />
              </div>
            )}

            {/* Icon */}
            <div className="relative z-10 flex items-center justify-center">
              {isUnlocked ? (
                <achievement.icon
                  className={cn(iconSizes[size], "transition-all duration-300", isHovered && "scale-110 rotate-12")}
                  style={{ color: achievement.color }}
                />
              ) : (
                <Lock className={cn(iconSizes[size], "text-muted-foreground")} />
              )}
            </div>

            {/* Tier Badge */}
            <Badge
              className={cn(
                "absolute -top-1 -right-1 text-xs px-1 py-0 h-5",
                `bg-gradient-to-r ${tierInfo.gradient} text-white border-0`,
              )}
            >
              {achievement.tier.charAt(0).toUpperCase()}
            </Badge>

            {/* Progress Ring for Partial Progress */}
            {!isUnlocked && userAchievement.progress > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="transparent"
                    className="text-muted-foreground/20"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke={achievement.color}
                    strokeWidth="2"
                    fill="transparent"
                    strokeDasharray={`${progressPercentage * 2.83} 283`}
                    className="transition-all duration-500"
                  />
                </svg>
              </div>
            )}
          </Card>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <achievement.icon className="h-4 w-4" style={{ color: achievement.color }} />
              <span className="font-semibold">{achievement.title}</span>
              <Badge className={`bg-gradient-to-r ${tierInfo.gradient} text-white border-0 text-xs`}>
                {achievement.tier}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{achievement.description}</p>
            {!isUnlocked && showProgress && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>
                    {userAchievement.progress}/{userAchievement.maxProgress}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
              </div>
            )}
            <div className="flex justify-between text-xs">
              <span>Points: {achievement.points}</span>
              {isUnlocked && <span className="text-green-500">✓ Unlocked</span>}
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
