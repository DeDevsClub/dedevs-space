"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AchievementBadge from "@/components/admin/achievement-badge"
import GitHubContributionGraph from "@/components/admin/github-contribution-graph"
import {
  Share2,
  Trophy,
  Star,
  GitBranch,
  Calendar,
  Eye,
  Users,
  Zap,
  Copy,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { SharingProfile } from "@/lib/sharing"
import { PROFILE_THEMES, getShareUrl } from "@/lib/sharing"
import { ACHIEVEMENTS, getUserAchievements, type UserStats } from "@/lib/achievements"

interface SharingProfileProps {
  profile: SharingProfile
  isOwner?: boolean
  className?: string
}

export default function SharingProfileComponent({ profile, isOwner = false, className }: SharingProfileProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [githubContributions, setGithubContributions] = useState<any[]>([])

  const theme = PROFILE_THEMES[profile.customization.theme]

  // Mock user stats for achievements
  const userStats: UserStats = {
    totalPoints: profile.stats.totalPoints,
    achievementsUnlocked: profile.stats.achievementsUnlocked,
    currentStreak: profile.stats.currentStreak,
    profileCompletion: 95,
    skillsCount: 12,
    projectsCount: 6,
    articlesCount: 4,
    githubStats: {
      repos: 42,
      stars: profile.stats.githubStars,
      commits: profile.stats.githubCommits,
      followers: 89,
    },
  }

  const userAchievements = getUserAchievements(userStats)
  const unlockedAchievements = ACHIEVEMENTS.filter((achievement) =>
    userAchievements.find((ua) => ua.achievementId === achievement.id && ua.isCompleted),
  )

  const handleShare = (platform: string) => {
    const shareUrl = getShareUrl(profile.id, platform)
    if (platform === "discord") {
      navigator.clipboard.writeText(shareUrl)
      // Show toast notification
    } else {
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  const copyProfileUrl = () => {
    const profileUrl = `${window.location.origin}/profile/${profile.username}`
    navigator.clipboard.writeText(profileUrl)
    // Show toast notification
  }

  return (
    <div className={cn("max-w-6xl mx-auto space-y-6", className)}>
      {/* Profile Header */}
      <Card className="relative overflow-hidden">
        {/* Banner */}
        {profile.bannerUrl && (
          <div className="h-48 relative">
            <Image src={profile.bannerUrl || "/placeholder.svg"} alt="Profile banner" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <CardContent className="relative p-6">
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex-shrink-0 -mt-16 md:-mt-20 relative z-10">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background">
                <AvatarImage src={profile.avatarUrl || "/placeholder.svg"} alt={profile.displayName} />
                <AvatarFallback className="text-2xl">
                  {profile.displayName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold">{profile.displayName}</h1>
                <p className="text-muted-foreground">@{profile.username}</p>
                <p className="mt-2 text-lg">{profile.bio}</p>
              </div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">{profile.stats.achievementsUnlocked}</span>
                  <span className="text-muted-foreground">achievements</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">{profile.stats.totalPoints}</span>
                  <span className="text-muted-foreground">points</span>
                </div>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-green-500" />
                  <span className="font-medium">{profile.stats.githubStars}</span>
                  <span className="text-muted-foreground">GitHub stars</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <span className="font-medium">{profile.stats.currentStreak}</span>
                  <span className="text-muted-foreground">day streak</span>
                </div>
              </div>

              {/* Rank Badge */}
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-lg px-3 py-1">
                  #{profile.stats.rank} Overall
                </Badge>
                <Badge variant="outline">{profile.stats.coursesCompleted} courses completed</Badge>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Button onClick={() => handleShare("twitter")} size="sm" variant="outline">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button onClick={() => handleShare("linkedin")} size="sm" variant="outline">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button onClick={() => handleShare("facebook")} size="sm" variant="outline">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button onClick={copyProfileUrl} size="sm" variant="outline">
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              {isOwner && (
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="github">GitHub</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Highlights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Highlights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {profile.highlights.map((highlight) => (
                  <Card key={highlight.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {highlight.imageUrl && (
                          <Image
                            src={highlight.imageUrl || "/placeholder.svg"}
                            alt={highlight.title}
                            width={48}
                            height={48}
                            className="rounded-lg"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{highlight.title}</h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{highlight.description}</p>
                          <p className="text-xs text-muted-foreground mt-1">{highlight.date.toLocaleDateString()}</p>
                        </div>
                      </div>
                      {highlight.featured && (
                        <Badge className="absolute top-2 right-2" variant="secondary">
                          Featured
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 overflow-x-auto pb-2">
                {unlockedAchievements.slice(0, 8).map((achievement) => {
                  const userAchievement = userAchievements.find((ua) => ua.achievementId === achievement.id)!
                  return (
                    <div key={achievement.id} className="flex-shrink-0">
                      <AchievementBadge achievement={achievement} userAchievement={userAchievement} size="md" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Profile Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Eye className="h-8 w-8 mx-auto text-blue-500 mb-2" />
                <div className="text-2xl font-bold">{profile.stats.profileViews.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Profile Views</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Share2 className="h-8 w-8 mx-auto text-green-500 mb-2" />
                <div className="text-2xl font-bold">{profile.stats.socialShares}</div>
                <div className="text-sm text-muted-foreground">Social Shares</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Calendar className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                <div className="text-2xl font-bold">{profile.stats.joinedDaysAgo}</div>
                <div className="text-sm text-muted-foreground">Days Active</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 mx-auto text-orange-500 mb-2" />
                <div className="text-2xl font-bold">#{profile.stats.rank}</div>
                <div className="text-sm text-muted-foreground">Global Rank</div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Achievements ({unlockedAchievements.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {ACHIEVEMENTS.map((achievement) => {
                  const userAchievement = userAchievements.find((ua) => ua.achievementId === achievement.id)!
                  return (
                    <div key={achievement.id} className="text-center space-y-2">
                      <AchievementBadge achievement={achievement} userAchievement={userAchievement} size="lg" />
                      <div>
                        <h4 className="font-medium">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-2">{achievement.description}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4" />
                <p>Course completion data will be displayed here</p>
                <p className="text-sm">Integration with course system coming soon</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="github" className="space-y-6">
          <GitHubContributionGraph contributions={[]} />
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Courses Completed</span>
                  <span className="font-medium">{profile.stats.coursesCompleted}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Points</span>
                  <span className="font-medium">{profile.stats.totalPoints.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Achievements</span>
                  <span className="font-medium">{profile.stats.achievementsUnlocked}</span>
                </div>
                <div className="flex justify-between">
                  <span>Current Streak</span>
                  <span className="font-medium">{profile.stats.currentStreak} days</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GitHub Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Stars</span>
                  <span className="font-medium">{profile.stats.githubStars}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Commits</span>
                  <span className="font-medium">{profile.stats.githubCommits.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Profile Views</span>
                  <span className="font-medium">{profile.stats.profileViews.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Social Shares</span>
                  <span className="font-medium">{profile.stats.socialShares}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
