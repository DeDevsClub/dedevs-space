import type { LucideIcon } from "lucide-react"
import {
  Trophy,
  Star,
  Zap,
  Crown,
  Shield,
  Gem,
  Rocket,
  GitBranch,
  BookOpen,
  Coffee,
  Flame,
  Sparkles,
} from "lucide-react"

export interface Achievement {
  id: string
  title: string
  description: string
  icon: LucideIcon
  category: AchievementCategory
  tier: AchievementTier
  points: number
  requirements: AchievementRequirement[]
  unlockedAt?: Date
  progress?: number
  maxProgress?: number
  isSecret?: boolean
  color: string
  gradient: string
}

export interface AchievementRequirement {
  type:
    | "profile_completion"
    | "skills_added"
    | "projects_created"
    | "articles_written"
    | "github_commits"
    | "github_stars"
    | "github_repos"
    | "course_completion"
    | "streak_days"
    | "social_shares"
  value: number
  operator: "gte" | "eq" | "lte"
}

export type AchievementCategory =
  | "profile"
  | "skills"
  | "projects"
  | "content"
  | "github"
  | "learning"
  | "social"
  | "special"

export type AchievementTier = "bronze" | "silver" | "gold" | "platinum" | "diamond" | "legendary"

export const ACHIEVEMENT_TIERS: Record<AchievementTier, { color: string; gradient: string; points: number }> = {
  bronze: {
    color: "#CD7F32",
    gradient: "from-amber-600 to-amber-800",
    points: 10,
  },
  silver: {
    color: "#C0C0C0",
    gradient: "from-gray-400 to-gray-600",
    points: 25,
  },
  gold: {
    color: "#FFD700",
    gradient: "from-yellow-400 to-yellow-600",
    points: 50,
  },
  platinum: {
    color: "#E5E4E2",
    gradient: "from-slate-300 to-slate-500",
    points: 100,
  },
  diamond: {
    color: "#B9F2FF",
    gradient: "from-cyan-300 to-blue-500",
    points: 200,
  },
  legendary: {
    color: "#FF6B6B",
    gradient: "from-purple-500 to-pink-500",
    points: 500,
  },
}

export const ACHIEVEMENTS: Achievement[] = [
  // Profile Achievements
  {
    id: "profile_complete",
    title: "Profile Master",
    description: "Complete your developer profile with all sections filled",
    icon: Trophy,
    category: "profile",
    tier: "gold",
    points: 50,
    requirements: [{ type: "profile_completion", value: 100, operator: "gte" }],
    color: "#FFD700",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    id: "first_skill",
    title: "Skill Collector",
    description: "Add your first skill to showcase your expertise",
    icon: Zap,
    category: "skills",
    tier: "bronze",
    points: 10,
    requirements: [{ type: "skills_added", value: 1, operator: "gte" }],
    color: "#CD7F32",
    gradient: "from-amber-600 to-amber-800",
  },
  {
    id: "skill_master",
    title: "Polyglot Developer",
    description: "Master 10 different technologies and skills",
    icon: Crown,
    category: "skills",
    tier: "platinum",
    points: 100,
    requirements: [{ type: "skills_added", value: 10, operator: "gte" }],
    color: "#E5E4E2",
    gradient: "from-slate-300 to-slate-500",
  },

  // Project Achievements
  {
    id: "first_project",
    title: "Project Pioneer",
    description: "Showcase your first project",
    icon: Rocket,
    category: "projects",
    tier: "bronze",
    points: 10,
    requirements: [{ type: "projects_created", value: 1, operator: "gte" }],
    color: "#CD7F32",
    gradient: "from-amber-600 to-amber-800",
  },
  {
    id: "project_portfolio",
    title: "Portfolio Builder",
    description: "Create an impressive portfolio with 5+ projects",
    icon: Shield,
    category: "projects",
    tier: "gold",
    points: 50,
    requirements: [{ type: "projects_created", value: 5, operator: "gte" }],
    color: "#FFD700",
    gradient: "from-yellow-400 to-yellow-600",
  },

  // Content Achievements
  {
    id: "first_article",
    title: "Content Creator",
    description: "Share your knowledge by writing your first article",
    icon: BookOpen,
    category: "content",
    tier: "silver",
    points: 25,
    requirements: [{ type: "articles_written", value: 1, operator: "gte" }],
    color: "#C0C0C0",
    gradient: "from-gray-400 to-gray-600",
  },
  {
    id: "prolific_writer",
    title: "Thought Leader",
    description: "Become a thought leader with 10+ published articles",
    icon: Gem,
    category: "content",
    tier: "diamond",
    points: 200,
    requirements: [{ type: "articles_written", value: 10, operator: "gte" }],
    color: "#B9F2FF",
    gradient: "from-cyan-300 to-blue-500",
  },

  // GitHub Achievements
  {
    id: "github_connected",
    title: "Open Source Contributor",
    description: "Connect your GitHub account and showcase your contributions",
    icon: GitBranch,
    category: "github",
    tier: "bronze",
    points: 10,
    requirements: [{ type: "github_repos", value: 1, operator: "gte" }],
    color: "#CD7F32",
    gradient: "from-amber-600 to-amber-800",
  },
  {
    id: "commit_streak",
    title: "Code Warrior",
    description: "Maintain a 30-day coding streak on GitHub",
    icon: Flame,
    category: "github",
    tier: "gold",
    points: 50,
    requirements: [{ type: "streak_days", value: 30, operator: "gte" }],
    color: "#FFD700",
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    id: "github_star",
    title: "Community Favorite",
    description: "Earn 100+ stars across your repositories",
    icon: Star,
    category: "github",
    tier: "platinum",
    points: 100,
    requirements: [{ type: "github_stars", value: 100, operator: "gte" }],
    color: "#E5E4E2",
    gradient: "from-slate-300 to-slate-500",
  },

  // Special Achievements
  {
    id: "early_adopter",
    title: "Early Adopter",
    description: "One of the first 100 developers to join the platform",
    icon: Sparkles,
    category: "special",
    tier: "legendary",
    points: 500,
    requirements: [],
    isSecret: true,
    color: "#FF6B6B",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "coffee_lover",
    title: "Caffeine Powered",
    description: "Take 50 coffee breaks (you deserve it!)",
    icon: Coffee,
    category: "special",
    tier: "silver",
    points: 25,
    requirements: [],
    isSecret: true,
    color: "#C0C0C0",
    gradient: "from-gray-400 to-gray-600",
  },
]

// User Achievement Progress
export interface UserAchievement {
  achievementId: string
  unlockedAt?: Date
  progress: number
  maxProgress: number
  isCompleted: boolean
}

export interface UserStats {
  totalPoints: number
  achievementsUnlocked: number
  currentStreak: number
  profileCompletion: number
  skillsCount: number
  projectsCount: number
  articlesCount: number
  githubStats: {
    repos: number
    stars: number
    commits: number
    followers: number
  }
}

// Achievement calculation functions
export function calculateAchievementProgress(
  achievement: Achievement,
  userStats: UserStats,
): { progress: number; maxProgress: number; isCompleted: boolean } {
  let progress = 0
  let maxProgress = 1

  for (const requirement of achievement.requirements) {
    let currentValue = 0

    switch (requirement.type) {
      case "profile_completion":
        currentValue = userStats.profileCompletion
        break
      case "skills_added":
        currentValue = userStats.skillsCount
        break
      case "projects_created":
        currentValue = userStats.projectsCount
        break
      case "articles_written":
        currentValue = userStats.articlesCount
        break
      case "github_commits":
        currentValue = userStats.githubStats.commits
        break
      case "github_stars":
        currentValue = userStats.githubStats.stars
        break
      case "github_repos":
        currentValue = userStats.githubStats.repos
        break
      case "streak_days":
        currentValue = userStats.currentStreak
        break
    }

    maxProgress = requirement.value
    progress = Math.min(currentValue, requirement.value)
  }

  const isCompleted = progress >= maxProgress

  return { progress, maxProgress, isCompleted }
}

export function getUserAchievements(userStats: UserStats): UserAchievement[] {
  return ACHIEVEMENTS.map((achievement) => {
    const { progress, maxProgress, isCompleted } = calculateAchievementProgress(achievement, userStats)

    return {
      achievementId: achievement.id,
      progress,
      maxProgress,
      isCompleted,
      unlockedAt: isCompleted ? new Date() : undefined,
    }
  })
}

export function getAchievementsByCategory(category: AchievementCategory): Achievement[] {
  return ACHIEVEMENTS.filter((achievement) => achievement.category === category)
}

export function getUnlockedAchievements(userAchievements: UserAchievement[]): Achievement[] {
  return ACHIEVEMENTS.filter((achievement) =>
    userAchievements.find((ua) => ua.achievementId === achievement.id && ua.isCompleted),
  )
}

export function getTotalPoints(userAchievements: UserAchievement[]): number {
  return getUnlockedAchievements(userAchievements).reduce((total, achievement) => total + achievement.points, 0)
}
