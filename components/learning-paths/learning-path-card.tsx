"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, Users, Star, Trophy, BookOpen, Target, CheckCircle, PlayCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LearningPath, UserPathProgress } from "@/lib/learning-paths"

interface LearningPathCardProps {
  path: LearningPath
  userProgress?: UserPathProgress
  onEnroll?: (pathId: string) => void
  onContinue?: (pathId: string) => void
  className?: string
}

export default function LearningPathCard({
  path,
  userProgress,
  onEnroll,
  onContinue,
  className,
}: LearningPathCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const isEnrolled = !!userProgress
  const isCompleted = userProgress?.completedAt
  const progress = userProgress?.overallProgress || 0

  const handleAction = () => {
    if (isEnrolled) {
      onContinue?.(path.id)
    } else {
      onEnroll?.(path.id)
    }
  }

  return (
    <Card
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:shadow-xl group",
        "border-2 hover:border-primary/20",
        className,
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-5 transition-opacity duration-300",
          `bg-gradient-to-br ${path.gradient}`,
          isHovered && "opacity-10",
        )}
      />

      {/* Header Image/Icon */}
      <div className="relative h-48 bg-gradient-to-br from-muted/50 to-muted">
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "p-6 rounded-full transition-all duration-300",
              `bg-gradient-to-br ${path.gradient}`,
              isHovered && "scale-110",
            )}
          >
            <path.icon className="h-12 w-12 text-white" />
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {path.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">New</Badge>}
          {path.isFeatured && <Badge className="bg-yellow-500 hover:bg-yellow-600 text-white">Featured</Badge>}
          {isCompleted && (
            <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white">
              <Trophy className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>

        {/* Difficulty */}
        <Badge variant="secondary" className="absolute top-4 right-4 capitalize">
          {path.difficulty}
        </Badge>
      </div>

      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">{path.title}</CardTitle>
            <CardDescription className="mt-2 line-clamp-2">{path.description}</CardDescription>
          </div>
        </div>

        {/* Path Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {path.duration}h
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {path.courses.length} courses
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            {path.enrolledCount.toLocaleString()}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-current text-yellow-500" />
            {path.rating}
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        {/* Progress */}
        {isEnrolled && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {userProgress?.completedCourses.length || 0} of {path.courses.length} courses completed
            </div>
          </div>
        )}

        {/* Skills Preview */}
        <div>
          <p className="text-sm font-medium mb-2">Skills you'll gain:</p>
          <div className="flex flex-wrap gap-1">
            {path.skills.slice(0, 3).map((skill) => (
              <Badge key={skill.id} variant="outline" className="text-xs">
                {skill.name}
              </Badge>
            ))}
            {path.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{path.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Outcomes Preview */}
        <div>
          <p className="text-sm font-medium mb-2">What you'll achieve:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            {path.outcomes.slice(0, 2).map((outcome, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="line-clamp-1">{outcome}</span>
              </li>
            ))}
            {path.outcomes.length > 2 && (
              <li className="text-xs text-muted-foreground">+{path.outcomes.length - 2} more outcomes</li>
            )}
          </ul>
        </div>

        {/* Prerequisites */}
        {path.prerequisites.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Prerequisites:</p>
            <div className="flex flex-wrap gap-1">
              {path.prerequisites.map((prereq) => (
                <Badge key={prereq} variant="secondary" className="text-xs">
                  {prereq}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Instructor */}
        <div className="flex items-center gap-3 pt-2 border-t">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?width=32&height=32" alt={path.createdBy} />
            <AvatarFallback>
              {path.createdBy
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{path.createdBy}</p>
            <p className="text-xs text-muted-foreground">Instructor</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Button onClick={handleAction} className="w-full group/btn" variant={isEnrolled ? "outline" : "default"}>
            {isCompleted ? (
              <>
                <Trophy className="mr-2 h-4 w-4" />
                View Certificate
              </>
            ) : isEnrolled ? (
              <>
                <PlayCircle className="mr-2 h-4 w-4" />
                Continue Learning
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </>
            ) : (
              <>
                <Target className="mr-2 h-4 w-4" />
                Start Learning Path
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
