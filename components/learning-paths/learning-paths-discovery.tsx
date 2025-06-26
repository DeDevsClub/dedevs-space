"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LearningPathCard from "./learning-path-card"
import { Search, Filter, TrendingUp, Clock, Users, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PathCategory, PathDifficulty, LearningPath } from "@/lib/learning-paths"
import { LEARNING_PATHS, PATH_CATEGORIES } from "@/lib/learning-paths"

interface LearningPathsDiscoveryProps {
  userProgress?: any[]
  onEnroll?: (pathId: string) => void
  onContinue?: (pathId: string) => void
  className?: string
}

export default function LearningPathsDiscovery({
  userProgress = [],
  onEnroll,
  onContinue,
  className,
}: LearningPathsDiscoveryProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<PathCategory | "all">("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState<PathDifficulty | "all">("all")
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "duration" | "newest">("popular")
  const [activeTab, setActiveTab] = useState("all")

  const filteredAndSortedPaths = useMemo(() => {
    let filtered = LEARNING_PATHS.filter((path: LearningPath) => {
      const matchesSearch =
        path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.tags.some((tag: string) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCategory = selectedCategory === "all" || path.category === selectedCategory
      const matchesDifficulty = selectedDifficulty === "all" || path.difficulty === selectedDifficulty

      return matchesSearch && matchesCategory && matchesDifficulty
    })

    // Apply tab filter
    if (activeTab === "enrolled") {
      filtered = filtered.filter((path: LearningPath) => userProgress.some((progress) => progress.pathId === path.id))
    } else if (activeTab === "completed") {
      filtered = filtered.filter((path: LearningPath) =>
        userProgress.some((progress) => progress.pathId === path.id && progress.completedAt),
      )
    } else if (activeTab === "recommended") {
      // Mock recommendation logic - in real app, this would be more sophisticated
      filtered = filtered.filter((path: LearningPath) => path.isFeatured || path.rating >= 4.7)
    }

    // Sort paths
    return filtered.sort((a: LearningPath, b: LearningPath) => {
      switch (sortBy) {
        case "popular":
          return b.enrolledCount - a.enrolledCount
        case "rating":
          return b.rating - a.rating
        case "duration":
          return a.duration - b.duration
        case "newest":
          return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
        default:
          return 0
      }
    })
  }, [searchQuery, selectedCategory, selectedDifficulty, sortBy, activeTab, userProgress])

  const getUserProgress = (pathId: string) => {
    return userProgress.find((progress) => progress.pathId === pathId)
  }

  const stats = useMemo(() => {
    const enrolled = userProgress.length
    const completed = userProgress.filter((p) => p.completedAt).length
    const inProgress = enrolled - completed

    return { enrolled, completed, inProgress }
  }, [userProgress])

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Learning Paths</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Structured learning journeys designed to build specific skills and advance your career
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-blue-500 mb-2" />
            <div className="text-2xl font-bold">{LEARNING_PATHS.length}</div>
            <div className="text-sm text-muted-foreground">Available Paths</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-green-500 mb-2" />
            <div className="text-2xl font-bold">{stats.enrolled}</div>
            <div className="text-sm text-muted-foreground">Enrolled</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto text-orange-500 mb-2" />
            <div className="text-2xl font-bold">{stats.inProgress}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 mx-auto text-yellow-500 mb-2" />
            <div className="text-2xl font-bold">{stats.completed}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Discover Learning Paths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search learning paths..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as PathCategory)}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(PATH_CATEGORIES).map(([key, category]) => (
                  <SelectItem key={key} value={key}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={(value) => setSelectedDifficulty(value as any)}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
                <SelectItem value="expert">Expert</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as any)}>
              <SelectTrigger className="w-full lg:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="duration">Shortest Duration</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Learning Paths */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Paths</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="enrolled">Enrolled</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {filteredAndSortedPaths.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No learning paths found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or browse all available paths
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setSelectedDifficulty("all")
                  }}
                >
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredAndSortedPaths.map((path: LearningPath) => (
                <LearningPathCard
                  key={path.id}
                  path={path}
                  userProgress={getUserProgress(path.id)}
                  onEnroll={onEnroll}
                  onContinue={onContinue}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Categories Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Explore by Category</CardTitle>
          <CardDescription>Choose a specialization that aligns with your career goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Object.entries(PATH_CATEGORIES).map(([key, category]) => {
              const pathsInCategory = LEARNING_PATHS.filter((p: LearningPath) => p.category === key)
              const Icon = category.icon

              return (
                <Card
                  key={key}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedCategory(key as PathCategory)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg" style={{ backgroundColor: `${category.color}20` }}>
                        <Icon className="h-6 w-6" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{category.label}</h3>
                        <p className="text-sm text-muted-foreground">{pathsInCategory.length} learning paths</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
