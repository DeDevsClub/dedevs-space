"use client"

import DashboardCard from "@/components/admin/dashboard-card"
import ProgressRing from "@/components/admin/progress-ring"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Activity, Users, Eye, Edit3, Zap, Target, Award, Rocket, Heart, Coffee, Sparkles } from "lucide-react"

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 p-6 border border-primary/20">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                Welcome back, Alex!
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </h1>
              <p className="text-muted-foreground mt-2">
                Your developer profile is looking amazing! Let's make it even better. 🚀
              </p>
            </div>
            <div className="hidden md:block">
              <ProgressRing progress={75} size={100}>
                <div className="text-center">
                  <div className="text-lg font-bold">75%</div>
                  <div className="text-xs text-muted-foreground">Complete</div>
                </div>
              </ProgressRing>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/bunsdev" target="_blank">
                <Rocket className="mr-2 h-4 w-4" />
                View Profile
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/dashboard/profile">
                <Edit3 className="mr-2 h-4 w-4" />
                Quick Edit
              </Link>
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <Coffee className="h-16 w-16 text-primary animate-bounce" />
        </div>
        <div className="absolute bottom-4 left-4 opacity-20">
          <Heart className="h-12 w-12 text-red-500 animate-pulse" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Profile Views"
          value="2,350"
          change="+20.1% from last month"
          icon={Eye}
          trend="up"
          gradient
          sparkle
          onClick={() => window.open("/admin/dashboard/analytics/views", "_self")}
        />
        <DashboardCard
          title="Contact Requests"
          value="12"
          change="+5 since last week"
          icon={Users}
          trend="up"
          sparkle
          onClick={() => window.open("/admin/dashboard/analytics/contacts", "_self")}
        />
        <DashboardCard
          title="Projects Synced"
          value="15"
          change="From GitHub"
          icon={Activity}
          trend="neutral"
          gradient
          onClick={() => window.open("/admin/dashboard/projects", "_self")}
        />
        <DashboardCard title="Profile Score" value="94%" change="Excellent!" icon={Award} trend="up" sparkle gradient />
      </div>

      {/* Quick Actions & Progress */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Quick Actions */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-yellow-500" />
              Quick Actions
            </CardTitle>
            <CardDescription>Boost your profile with these quick wins! ⚡</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border border-blue-200 dark:border-blue-800">
              <div>
                <p className="font-medium">Add a new skill</p>
                <p className="text-sm text-muted-foreground">Show off your expertise</p>
              </div>
              <Button size="sm" asChild>
                <Link href="/admin/dashboard/skills">
                  <Zap className="mr-1 h-3 w-3" />
                  Add
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50 border border-green-200 dark:border-green-800">
              <div>
                <p className="font-medium">Share an article</p>
                <p className="text-sm text-muted-foreground">Showcase your knowledge</p>
              </div>
              <Button size="sm" asChild>
                <Link href="/admin/dashboard/content/articles">
                  <Edit3 className="mr-1 h-3 w-3" />
                  Write
                </Link>
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50 border border-purple-200 dark:border-purple-800">
              <div>
                <p className="font-medium">Customize design</p>
                <p className="text-sm text-muted-foreground">Make it uniquely yours</p>
              </div>
              <Button size="sm" asChild>
                <Link href="/admin/dashboard/customize">
                  <Sparkles className="mr-1 h-3 w-3" />
                  Style
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Profile Completion */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-500" />
              Profile Completion
            </CardTitle>
            <CardDescription>
              You're almost there! Complete these sections to unlock your full potential. 🎯
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Basic Info</span>
                <Badge variant="default" className="bg-green-500">
                  Complete ✓
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Skills & Experience</span>
                <Badge variant="default" className="bg-green-500">
                  Complete ✓
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Projects</span>
                <Badge variant="secondary">3 more needed</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Content</span>
                <Badge variant="outline">Add articles</Badge>
              </div>

              <div className="pt-4">
                <ProgressRing progress={75} size={80} className="mx-auto">
                  <div className="text-center">
                    <div className="text-sm font-bold">75%</div>
                  </div>
                </ProgressRing>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Fun Motivation Section */}
      <Card className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500 animate-pulse" />
            Daily Motivation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2">
            <p className="text-lg font-medium">"Every expert was once a beginner. Every pro was once an amateur." 💪</p>
            <p className="text-sm text-muted-foreground">
              Keep building, keep learning, keep growing! Your next commit could change the world. 🌍
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <span className="text-2xl animate-bounce">🚀</span>
              <span className="text-2xl animate-bounce delay-100">⭐</span>
              <span className="text-2xl animate-bounce delay-200">💻</span>
              <span className="text-2xl animate-bounce delay-300">🎉</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
