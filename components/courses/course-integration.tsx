"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import CourseCompletionModal from "./course-completion-modal"
import { Play, Clock, Users, Star, Trophy, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Course, UserCourseProgress } from "@/lib/courses"
import { COURSES } from "@/lib/courses"

interface CourseIntegrationProps {
  className?: string
}

export default function CourseIntegration({ className }: CourseIntegrationProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [showCompletionModal, setShowCompletionModal] = useState(false)
  const [userProgress, setUserProgress] = useState<UserCourseProgress[]>([
    {
      courseId: "blockchain-fundamentals",
      enrolledAt: new Date("2024-01-01"),
      progress: 75,
      completedModules: ["intro-blockchain", "crypto-basics"],
      currentModule: "blockchain-quiz",
      timeSpent: 480,
      quizScores: { "blockchain-quiz": 85 },
    },
    {
      courseId: "ai-machine-learning",
      enrolledAt: new Date("2024-01-10"),
      completedAt: new Date("2024-01-25"),
      progress: 100,
      completedModules: ["ai-intro", "ml-algorithms"],
      timeSpent: 720,
      quizScores: { "ai-quiz": 92 },
    },
  ])

  const handleCourseComplete = (course: Course) => {
    setSelectedCourse(course)
    setShowCompletionModal(true)
  }

  const getCourseProgress = (courseId: string) => {
    return userProgress.find((p) => p.courseId === courseId)
  }

  const isEnrolled = (courseId: string) => {
    return userProgress.some((p) => p.courseId === courseId)
  }

  const handleEnroll = (course: Course) => {
    const newProgress: UserCourseProgress = {
      courseId: course.id,
      enrolledAt: new Date(),
      progress: 0,
      completedModules: [],
      timeSpent: 0,
      quizScores: {},
    }
    setUserProgress([...userProgress, newProgress])
  }

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Trophy className="h-8 w-8 text-primary" />
          Learning Courses
        </h1>
        <p className="text-muted-foreground">Master new skills and earn achievements</p>
      </div>

      {/* Featured Courses */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {COURSES.map((course) => {
          const progress = getCourseProgress(course.id)
          const enrolled = isEnrolled(course.id)
          const completed = progress?.progress === 100

          return (
            <Card
              key={course.id}
              className="relative overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Course Image */}
              <div className="aspect-video relative bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="absolute inset-0 flex items-center justify-center">
                  <course.icon className="h-16 w-16 text-primary/50" />
                </div>

                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {course.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                  {course.isFeatured && <Badge className="bg-yellow-500 hover:bg-yellow-600">Featured</Badge>}
                  {completed && (
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">
                      <Trophy className="h-3 w-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>

                {/* Difficulty */}
                <Badge variant="secondary" className="absolute top-2 right-2 capitalize">
                  {course.difficulty}
                </Badge>
              </div>

              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2 mt-2">{course.description}</CardDescription>
                  </div>
                </div>

                {/* Course Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}h
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.enrolledCount.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current text-yellow-500" />
                    {course.rating}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Skills */}
                <div>
                  <p className="text-sm font-medium mb-2">You'll learn:</p>
                  <div className="flex flex-wrap gap-1">
                    {course.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {course.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.skills.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Progress */}
                {enrolled && progress && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress.progress}%</span>
                    </div>
                    <Progress value={progress.progress} className="h-2" />
                  </div>
                )}

                {/* Points */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span className="font-medium">{course.points} points</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{course.modules.length} modules</div>
                </div>

                {/* Action Button */}
                <div className="pt-2">
                  {!enrolled ? (
                    <Button onClick={() => handleEnroll(course)} className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Enroll Now
                    </Button>
                  ) : completed ? (
                    <div className="space-y-2">
                      <Button onClick={() => handleCourseComplete(course)} variant="outline" className="w-full">
                        <Trophy className="mr-2 h-4 w-4" />
                        View Certificate
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full">
                      <Play className="mr-2 h-4 w-4" />
                      Continue Learning
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Course Completion Modal */}
      {selectedCourse && (
        <CourseCompletionModal
          course={selectedCourse}
          isOpen={showCompletionModal}
          onClose={() => setShowCompletionModal(false)}
          completionData={{
            score: 92,
            timeSpent: 720,
            rank: 15,
            pointsEarned: selectedCourse.points,
            achievementsUnlocked: selectedCourse.achievements,
          }}
        />
      )}
    </div>
  )
}
