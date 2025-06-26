import type { LucideIcon } from "lucide-react"
import { Code, Database, Shield, Rocket, Brain, Globe, Smartphone } from "lucide-react"

export interface Course {
  id: string
  title: string
  description: string
  category: CourseCategory
  difficulty: CourseDifficulty
  duration: number // in hours
  icon: LucideIcon
  instructor: string
  rating: number
  enrolledCount: number
  completionRate: number
  skills: string[]
  prerequisites: string[]
  modules: CourseModule[]
  achievements: string[] // Achievement IDs awarded upon completion
  points: number
  isNew?: boolean
  isFeatured?: boolean
  thumbnailUrl: string
  tags: string[]
}

export interface CourseModule {
  id: string
  title: string
  description: string
  duration: number // in minutes
  type: "video" | "reading" | "quiz" | "project"
  isCompleted?: boolean
  content?: string
  videoUrl?: string
  quizQuestions?: QuizQuestion[]
}

export interface QuizQuestion {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface UserCourseProgress {
  courseId: string
  enrolledAt: Date
  completedAt?: Date
  progress: number // 0-100
  completedModules: string[]
  currentModule?: string
  timeSpent: number // in minutes
  quizScores: { [moduleId: string]: number }
  certificateUrl?: string
}

export type CourseCategory =
  | "blockchain"
  | "ai-ml"
  | "web-development"
  | "mobile"
  | "devops"
  | "security"
  | "data-science"

export type CourseDifficulty = "beginner" | "intermediate" | "advanced" | "expert"

export const COURSE_CATEGORIES: Record<CourseCategory, { label: string; icon: LucideIcon; color: string }> = {
  blockchain: { label: "Blockchain", icon: Shield, color: "#8b5cf6" },
  "ai-ml": { label: "AI & ML", icon: Brain, color: "#06b6d4" },
  "web-development": { label: "Web Development", icon: Globe, color: "#10b981" },
  mobile: { label: "Mobile Development", icon: Smartphone, color: "#f59e0b" },
  devops: { label: "DevOps", icon: Rocket, color: "#ef4444" },
  security: { label: "Security", icon: Shield, color: "#6366f1" },
  "data-science": { label: "Data Science", icon: Database, color: "#ec4899" },
}

export const COURSES: Course[] = [
  {
    id: "blockchain-fundamentals",
    title: "Blockchain Fundamentals",
    description:
      "Master the core concepts of blockchain technology, from basic principles to advanced implementations.",
    category: "blockchain",
    difficulty: "beginner",
    duration: 12,
    icon: Shield,
    instructor: "Dr. Sarah Chen",
    rating: 4.8,
    enrolledCount: 2340,
    completionRate: 87,
    skills: ["Blockchain", "Cryptocurrency", "Smart Contracts", "DeFi"],
    prerequisites: [],
    points: 100,
    isNew: true,
    isFeatured: true,
    thumbnailUrl: "/placeholder.svg?width=400&height=200",
    tags: ["blockchain", "cryptocurrency", "web3", "fundamentals"],
    achievements: ["blockchain_beginner", "first_course_complete"],
    modules: [
      {
        id: "intro-blockchain",
        title: "Introduction to Blockchain",
        description: "Understanding the basics of blockchain technology",
        duration: 45,
        type: "video",
        videoUrl: "https://example.com/video1",
      },
      {
        id: "crypto-basics",
        title: "Cryptocurrency Fundamentals",
        description: "Learn about digital currencies and their mechanics",
        duration: 60,
        type: "reading",
        content: "Comprehensive guide to cryptocurrency...",
      },
      {
        id: "blockchain-quiz",
        title: "Blockchain Knowledge Check",
        description: "Test your understanding of blockchain concepts",
        duration: 30,
        type: "quiz",
        quizQuestions: [
          {
            id: "q1",
            question: "What is a blockchain?",
            options: ["A type of database", "A distributed ledger", "A programming language", "A web framework"],
            correctAnswer: 1,
            explanation: "A blockchain is a distributed ledger that maintains a continuously growing list of records.",
          },
        ],
      },
    ],
  },
  {
    id: "ai-machine-learning",
    title: "AI & Machine Learning Mastery",
    description:
      "Comprehensive course covering AI fundamentals, machine learning algorithms, and practical applications.",
    category: "ai-ml",
    difficulty: "intermediate",
    duration: 20,
    icon: Brain,
    instructor: "Prof. Alex Rodriguez",
    rating: 4.9,
    enrolledCount: 1890,
    completionRate: 82,
    skills: ["Python", "TensorFlow", "Neural Networks", "Deep Learning"],
    prerequisites: ["Python Programming", "Statistics"],
    points: 150,
    isFeatured: true,
    thumbnailUrl: "/placeholder.svg?width=400&height=200",
    tags: ["ai", "machine-learning", "python", "tensorflow"],
    achievements: ["ai_specialist", "ml_practitioner"],
    modules: [
      {
        id: "ai-intro",
        title: "Introduction to AI",
        description: "Overview of artificial intelligence and its applications",
        duration: 50,
        type: "video",
      },
      {
        id: "ml-algorithms",
        title: "Machine Learning Algorithms",
        description: "Deep dive into various ML algorithms",
        duration: 90,
        type: "reading",
      },
    ],
  },
  {
    id: "react-advanced",
    title: "Advanced React Development",
    description: "Master advanced React patterns, performance optimization, and modern development practices.",
    category: "web-development",
    difficulty: "advanced",
    duration: 16,
    icon: Code,
    instructor: "Emma Thompson",
    rating: 4.7,
    enrolledCount: 3200,
    completionRate: 79,
    skills: ["React", "TypeScript", "Next.js", "Performance Optimization"],
    prerequisites: ["JavaScript", "React Basics"],
    points: 120,
    thumbnailUrl: "/placeholder.svg?width=400&height=200",
    tags: ["react", "javascript", "frontend", "typescript"],
    achievements: ["react_master", "frontend_expert"],
    modules: [
      {
        id: "react-patterns",
        title: "Advanced React Patterns",
        description: "Learn advanced patterns for scalable React applications",
        duration: 75,
        type: "video",
      },
    ],
  },
]

// Course progress and completion functions
export function calculateCourseProgress(completedModules: string[], totalModules: number): number {
  return Math.round((completedModules.length / totalModules) * 100)
}

export function isCourseCompleted(progress: UserCourseProgress): boolean {
  return progress.progress === 100 && !!progress.completedAt
}

export function getCourseCompletionTime(progress: UserCourseProgress): number | null {
  if (!progress.completedAt || !progress.enrolledAt) return null
  return Math.ceil((progress.completedAt.getTime() - progress.enrolledAt.getTime()) / (1000 * 60 * 60 * 24))
}

export function getUserCourseStats(userProgress: UserCourseProgress[]): {
  totalCourses: number
  completedCourses: number
  inProgressCourses: number
  totalTimeSpent: number
  averageCompletionTime: number
  completionRate: number
} {
  const totalCourses = userProgress.length
  const completedCourses = userProgress.filter((p) => isCourseCompleted(p)).length
  const inProgressCourses = totalCourses - completedCourses
  const totalTimeSpent = userProgress.reduce((sum, p) => sum + p.timeSpent, 0)

  const completionTimes = userProgress
    .filter((p) => isCourseCompleted(p))
    .map((p) => getCourseCompletionTime(p))
    .filter((time) => time !== null) as number[]

  const averageCompletionTime =
    completionTimes.length > 0 ? completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length : 0

  const completionRate = totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0

  return {
    totalCourses,
    completedCourses,
    inProgressCourses,
    totalTimeSpent,
    averageCompletionTime,
    completionRate,
  }
}
