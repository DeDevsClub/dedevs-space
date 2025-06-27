export interface SharingProfile {
  id: string
  userId: string
  username: string
  displayName: string
  bio: string
  avatarUrl: string
  bannerUrl?: string
  isPublic: boolean
  customization: ProfileCustomization
  stats: ProfileStats
  highlights: ProfileHighlight[]
  socialLinks: any[] // SocialLink
  createdAt: Date
  updatedAt: Date
}

export interface ProfileCustomization {
  theme: "default" | "dark" | "colorful" | "minimal" | "gradient"
  primaryColor: string
  accentColor: string
  layout: "grid" | "list" | "cards" | "timeline"
  showGitHub: boolean
  showAchievements: boolean
  showCourses: boolean
  showProjects: boolean
  showStats: boolean
  customCSS?: string
  backgroundPattern?: string
}

export interface ProfileStats {
  coursesCompleted: number
  achievementsUnlocked: number
  totalPoints: number
  githubStars: number
  githubCommits: number
  currentStreak: number
  profileViews: number
  socialShares: number
  rank: number
  joinedDaysAgo: number
}

export interface ProfileHighlight {
  id: string
  type: "achievement" | "course" | "project" | "article" | "github"
  title: string
  description: string
  imageUrl?: string
  url?: string
  date: Date
  featured: boolean
}

export interface SocialLink {
  id: string
  platform: string
  url: string
}

export interface SocialShare {
  id: string
  userId: string
  type: "achievement" | "course_completion" | "rank_improvement" | "streak_milestone"
  content: string
  imageUrl?: string
  metadata: Record<string, any>
  platform: "twitter" | "linkedin" | "facebook" | "discord" | "custom"
  createdAt: Date
  engagement: {
    views: number
    likes: number
    shares: number
    comments: number
  }
}

export const PROFILE_THEMES = {
  default: {
    name: "Default",
    primaryColor: "#3b82f6",
    accentColor: "#10b981",
    background: "bg-background",
    preview: "bg-gradient-to-br from-blue-50 to-green-50",
  },
  dark: {
    name: "Dark Mode",
    primaryColor: "#6366f1",
    accentColor: "#8b5cf6",
    background: "bg-gray-900",
    preview: "bg-gradient-to-br from-gray-900 to-purple-900",
  },
  colorful: {
    name: "Colorful",
    primaryColor: "#f59e0b",
    accentColor: "#ec4899",
    background: "bg-gradient-to-br from-yellow-50 to-pink-50",
    preview: "bg-gradient-to-br from-yellow-200 to-pink-200",
  },
  minimal: {
    name: "Minimal",
    primaryColor: "#6b7280",
    accentColor: "#374151",
    background: "bg-white",
    preview: "bg-gradient-to-br from-gray-50 to-gray-100",
  },
  gradient: {
    name: "Gradient",
    primaryColor: "#8b5cf6",
    accentColor: "#06b6d4",
    background: "bg-gradient-to-br from-purple-400 to-cyan-400",
    preview: "bg-gradient-to-br from-purple-400 to-cyan-400",
  },
}

// Sharing utilities
export function generateShareText(type: SocialShare["type"], metadata: Record<string, any>): string {
  switch (type) {
    case "achievement":
      return `🏆 Just unlocked the "${metadata.achievementTitle}" achievement! ${metadata.description} #DevLearning #Achievement`
    case "course_completion":
      return `🎓 Just completed "${metadata.courseTitle}"! Learned ${metadata.skills?.join(", ")} and earned ${metadata.points} points! #Learning #Developer`
    case "rank_improvement":
      return `📈 Climbed to rank #${metadata.newRank} on the leaderboard! Moving up ${metadata.improvement} spots! #DevCommunity #Progress`
    case "streak_milestone":
      return `🔥 ${metadata.streakDays} day coding streak! Consistency is key to growth! #CodingStreak #Developer`
    default:
      return "Check out my developer progress! #DevLearning"
  }
}

export function generateShareImage(type: SocialShare["type"], metadata: Record<string, any>): string {
  // In a real app, this would generate dynamic images
  const baseUrl = "/api/share-images"
  const params = new URLSearchParams({
    type,
    ...metadata,
  })
  return `${baseUrl}?${params.toString()}`
}

export function getShareUrl(profileId: string, platform: string): string {
  const profileUrl = `${window.location.origin}/profile/${profileId}`
  const text = "Check out my developer profile and achievements!"

  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`
    case "linkedin":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`
    case "discord":
      return profileUrl // Discord doesn't have a direct share URL, return profile URL for copying
    default:
      return profileUrl
  }
}

// Mock data
export function getMockSharingProfile(userId: string): SharingProfile {
  return {
    // id: `profile-${userId}`,
    id: `profile-bunsdev`,
    userId: bunsdev
    username: "bunsdev",
    displayName: "B. Enchantress",
    bio: "Full-stack developer passionate about blockchain and AI. Always learning, always building! 🚀",
    avatarUrl: "/placeholder.svg?width=200&height=200",
    bannerUrl: "/placeholder.svg?width=800&height=200",
    isPublic: true,
    customization: {
      theme: "gradient",
      primaryColor: "#8b5cf6",
      accentColor: "#06b6d4",
      layout: "cards",
      showGitHub: true,
      showAchievements: true,
      showCourses: true,
      showProjects: true,
      showStats: true,
      backgroundPattern: "dots",
    },
    stats: {
      coursesCompleted: 12,
      achievementsUnlocked: 28,
      totalPoints: 2850,
      githubStars: 245,
      githubCommits: 1250,
      currentStreak: 15,
      profileViews: 1420,
      socialShares: 89,
      rank: 15,
      joinedDaysAgo: 127,
    },
    highlights: [
      {
        id: "h1",
        type: "achievement",
        title: "Code Warrior",
        description: "Maintained a 30-day coding streak",
        imageUrl: "/placeholder.svg?width=100&height=100",
        date: new Date("2024-01-10"),
        featured: true,
      },
      {
        id: "h2",
        type: "course",
        title: "Blockchain Fundamentals",
        description: "Completed with 98% score",
        imageUrl: "/placeholder.svg?width=100&height=100",
        date: new Date("2024-01-08"),
        featured: true,
      },
    ],
    socialLinks: [
      { id: "sl1", platform: "GitHub", url: "https://github.com/bunsdev" },
      { id: "sl2", platform: "LinkedIn", url: "https://linkedin.com/in/buns" },
      { id: "sl3", platform: "Twitter", url: "https://twitter.com/bunsdev" },
    ],
    createdAt: new Date("2025-06-25"),
    updatedAt: new Date("2025-06-25"),
  }
}
