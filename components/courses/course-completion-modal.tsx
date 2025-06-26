"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import AchievementBadge from "@/components/admin/achievement-badge"
import { Trophy, Star, Share2, Download, Sparkles, Zap } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Course } from "@/lib/courses"
import { ACHIEVEMENTS } from "@/lib/achievements"
import { generateShareText } from "@/lib/sharing"

interface CourseCompletionModalProps {
  course: Course
  isOpen: boolean
  onClose: () => void
  completionData: {
    score: number
    timeSpent: number
    rank: number
    pointsEarned: number
    achievementsUnlocked: string[]
  }
}

export default function CourseCompletionModal({ course, isOpen, onClose, completionData }: CourseCompletionModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const unlockedAchievements = ACHIEVEMENTS.filter((achievement) =>
    completionData.achievementsUnlocked.includes(achievement.id),
  )

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      setCurrentStep(0)

      // Animate through steps
      const timer = setTimeout(() => setCurrentStep(1), 500)
      const timer2 = setTimeout(() => setCurrentStep(2), 1000)
      const timer3 = setTimeout(() => setCurrentStep(3), 1500)

      return () => {
        clearTimeout(timer)
        clearTimeout(timer2)
        clearTimeout(timer3)
      }
    }
  }, [isOpen])

  const handleShare = (platform: string) => {
    const shareText = generateShareText("course_completion", {
      courseTitle: course.title,
      skills: course.skills,
      points: completionData.pointsEarned,
      score: completionData.score,
    })

    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    window.open(shareUrl, "_blank", "width=600,height=400")
  }

  const handleDownloadCertificate = () => {
    // In a real app, this would generate and download a certificate
    console.log("Downloading certificate for", course.title)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Confetti Effect */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </div>
            ))}
          </div>
        )}

        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto">
            <div
              className={cn(
                "w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center transition-all duration-500",
                currentStep >= 0 ? "scale-100 opacity-100" : "scale-0 opacity-0",
              )}
            >
              <Trophy className="h-10 w-10 text-white" />
            </div>
          </div>

          <DialogTitle
            className={cn(
              "text-3xl font-bold transition-all duration-500 delay-300",
              currentStep >= 1 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            Course Completed! 🎉
          </DialogTitle>

          <DialogDescription
            className={cn(
              "text-lg transition-all duration-500 delay-500",
              currentStep >= 2 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
            )}
          >
            Congratulations on completing <strong>{course.title}</strong>!
          </DialogDescription>
        </DialogHeader>

        <div
          className={cn(
            "space-y-6 transition-all duration-500 delay-700",
            currentStep >= 3 ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
          )}
        >
          {/* Completion Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 rounded-lg">
              <Star className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-2xl font-bold">{completionData.score}%</div>
              <div className="text-sm text-muted-foreground">Final Score</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 rounded-lg">
              <Zap className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-2xl font-bold">{completionData.pointsEarned}</div>
              <div className="text-sm text-muted-foreground">Points Earned</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 rounded-lg">
              <Trophy className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <div className="text-2xl font-bold">#{completionData.rank}</div>
              <div className="text-sm text-muted-foreground">Class Rank</div>
            </div>

            <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50 rounded-lg">
              <div className="text-2xl font-bold">{Math.round(completionData.timeSpent / 60)}h</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </div>
          </div>

          {/* Skills Mastered */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              Skills Mastered
            </h3>
            <div className="flex flex-wrap gap-2">
              {course.skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                >
                  ✓ {skill}
                </Badge>
              ))}
            </div>
          </div>

          {/* Achievements Unlocked */}
          {unlockedAchievements.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                New Achievements Unlocked!
              </h3>
              <div className="flex gap-4 justify-center">
                {unlockedAchievements.map((achievement) => (
                  <div key={achievement.id} className="text-center">
                    <AchievementBadge
                      achievement={achievement}
                      userAchievement={{
                        achievementId: achievement.id,
                        progress: achievement.requirements[0]?.value || 1,
                        maxProgress: achievement.requirements[0]?.value || 1,
                        isCompleted: true,
                        unlockedAt: new Date(),
                      }}
                      size="lg"
                    />
                    <p className="text-sm font-medium mt-2">{achievement.title}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress to Next Level */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Your Learning Journey</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Next Level</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-3" />
              <p className="text-sm text-muted-foreground">
                Complete 2 more courses to reach the next level and unlock exclusive benefits!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={handleDownloadCertificate} className="flex-1">
              <Download className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
            <Button onClick={() => handleShare("twitter")} variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share Achievement
            </Button>
          </div>

          {/* Next Steps */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">What's Next?</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>• Explore advanced courses in {course.category}</li>
              <li>• Join the community discussion about this course</li>
              <li>• Apply your new skills in a real project</li>
              <li>• Share your experience with other learners</li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
