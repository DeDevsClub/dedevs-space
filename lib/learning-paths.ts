import type { LucideIcon } from "lucide-react"
import { Code, Database, Shield, Rocket, Brain, Globe, Smartphone } from "lucide-react"

export interface LearningPath {
  id: string
  title: string
  description: string
  category: PathCategory
  difficulty: PathDifficulty
  duration: number // total hours
  icon: LucideIcon
  color: string
  gradient: string
  prerequisites: string[]
  courses: PathCourse[]
  skills: PathSkill[]
  outcomes: string[]
  assessments: PathAssessment[]
  enrolledCount: number
  completionRate: number
  rating: number
  isNew?: boolean
  isFeatured?: boolean
  thumbnailUrl: string
  tags: string[]
  createdBy: string
  lastUpdated: Date
}

export interface PathCourse {
  courseId: string
  order: number
  isRequired: boolean
  estimatedHours: number
  prerequisites?: string[] // Other courses in the path
  description?: string
}

export interface PathSkill {
  id: string
  name: string
  level: SkillLevel
  category: string
  description: string
  assessmentWeight: number // How much this skill is weighted in assessments
}

export interface PathAssessment {
  id: string
  title: string
  type: AssessmentType
  position: AssessmentPosition
  courseId?: string // If tied to specific course
  duration: number // minutes
  passingScore: number
  questions: AssessmentQuestion[]
  skills: string[] // Skill IDs being assessed
  isRequired: boolean
}

export interface AssessmentQuestion {
  id: string
  type: QuestionType
  title: string
  description: string
  points: number
  timeLimit?: number // seconds
  difficulty: QuestionDifficulty
  skills: string[] // Skill IDs
  content: QuestionContent
}

export interface QuestionContent {
  // Multiple Choice
  question?: string
  options?: string[]
  correctAnswer?: number
  explanation?: string

  // Coding Challenge
  prompt?: string
  starterCode?: string
  testCases?: TestCase[]
  language?: string
  allowedLanguages?: string[]
  hints?: string[]

  // Practical Exercise
  scenario?: string
  tasks?: PracticalTask[]
  resources?: string[]
  submissionFormat?: string
}

export interface TestCase {
  id: string
  input: any
  expectedOutput: any
  isHidden: boolean
  description?: string
}

export interface PracticalTask {
  id: string
  description: string
  points: number
  criteria: string[]
  isRequired: boolean
}

export interface UserPathProgress {
  pathId: string
  userId: string
  enrolledAt: Date
  completedAt?: Date
  currentCourse?: string
  completedCourses: string[]
  assessmentResults: AssessmentResult[]
  overallProgress: number // 0-100
  skillProgress: { [skillId: string]: number }
  timeSpent: number // minutes
  lastActivity: Date
}

export interface AssessmentResult {
  assessmentId: string
  completedAt: Date
  score: number
  maxScore: number
  timeSpent: number
  questionResults: QuestionResult[]
  skillScores: { [skillId: string]: number }
  feedback: AssessmentFeedback
  attempts: number
  passed: boolean
}

export interface QuestionResult {
  questionId: string
  score: number
  maxScore: number
  timeSpent: number
  answer: any
  isCorrect: boolean
  feedback?: string
}

export interface AssessmentFeedback {
  overall: string
  strengths: string[]
  improvements: string[]
  recommendations: string[]
  nextSteps: string[]
  skillBreakdown: { [skillId: string]: SkillFeedback }
}

export interface SkillFeedback {
  score: number
  level: SkillLevel
  feedback: string
  recommendations: string[]
}

export type PathCategory =
  | "full-stack"
  | "frontend"
  | "backend"
  | "mobile"
  | "blockchain"
  | "ai-ml"
  | "devops"
  | "security"
  | "data-science"

export type PathDifficulty = "beginner" | "intermediate" | "advanced" | "expert"

export type SkillLevel = "novice" | "beginner" | "intermediate" | "advanced" | "expert"

export type AssessmentType = "knowledge-check" | "skill-assessment" | "final-exam" | "project-review"

export type AssessmentPosition = "course-end" | "path-milestone" | "path-final" | "prerequisite"

export type QuestionType = "multiple-choice" | "coding-challenge" | "practical-exercise" | "essay" | "drag-drop"

export type QuestionDifficulty = "easy" | "medium" | "hard" | "expert"

export const PATH_CATEGORIES: Record<PathCategory, { label: string; icon: LucideIcon; color: string }> = {
  "full-stack": { label: "Full Stack", icon: Globe, color: "#3b82f6" },
  frontend: { label: "Frontend", icon: Code, color: "#10b981" },
  backend: { label: "Backend", icon: Database, color: "#8b5cf6" },
  mobile: { label: "Mobile", icon: Smartphone, color: "#f59e0b" },
  blockchain: { label: "Blockchain", icon: Shield, color: "#6366f1" },
  "ai-ml": { label: "AI & ML", icon: Brain, color: "#06b6d4" },
  devops: { label: "DevOps", icon: Rocket, color: "#ef4444" },
  security: { label: "Security", icon: Shield, color: "#84cc16" },
  "data-science": { label: "Data Science", icon: Database, color: "#ec4899" },
}

// Sample Learning Paths
export const LEARNING_PATHS: LearningPath[] = [
  {
    id: "blockchain-developer",
    title: "Blockchain Developer Mastery",
    description: "Complete journey from blockchain fundamentals to building production-ready DeFi applications",
    category: "blockchain",
    difficulty: "intermediate",
    duration: 60,
    icon: Shield,
    color: "#6366f1",
    gradient: "from-indigo-500 to-purple-600",
    prerequisites: ["JavaScript", "Basic Programming"],
    enrolledCount: 1250,
    completionRate: 78,
    rating: 4.8,
    isFeatured: true,
    thumbnailUrl: "/placeholder.svg?width=400&height=200",
    tags: ["blockchain", "solidity", "defi", "smart-contracts"],
    createdBy: "Dr. Sarah Chen",
    lastUpdated: new Date("2024-01-15"),
    courses: [
      {
        courseId: "blockchain-fundamentals",
        order: 1,
        isRequired: true,
        estimatedHours: 12,
        description: "Foundation concepts of blockchain technology",
      },
      {
        courseId: "solidity-basics",
        order: 2,
        isRequired: true,
        estimatedHours: 16,
        prerequisites: ["blockchain-fundamentals"],
        description: "Learn Solidity programming language",
      },
      {
        courseId: "smart-contracts-advanced",
        order: 3,
        isRequired: true,
        estimatedHours: 20,
        prerequisites: ["solidity-basics"],
        description: "Advanced smart contract development",
      },
      {
        courseId: "defi-protocols",
        order: 4,
        isRequired: false,
        estimatedHours: 12,
        prerequisites: ["smart-contracts-advanced"],
        description: "Building DeFi protocols and applications",
      },
    ],
    skills: [
      {
        id: "blockchain-concepts",
        name: "Blockchain Fundamentals",
        level: "advanced",
        category: "Core Knowledge",
        description: "Understanding of blockchain architecture, consensus mechanisms, and cryptography",
        assessmentWeight: 0.2,
      },
      {
        id: "solidity-programming",
        name: "Solidity Programming",
        level: "advanced",
        category: "Programming",
        description: "Proficiency in writing secure and efficient smart contracts",
        assessmentWeight: 0.3,
      },
      {
        id: "defi-development",
        name: "DeFi Development",
        level: "intermediate",
        category: "Application Development",
        description: "Building decentralized finance applications and protocols",
        assessmentWeight: 0.25,
      },
      {
        id: "security-best-practices",
        name: "Smart Contract Security",
        level: "advanced",
        category: "Security",
        description: "Implementing security best practices and avoiding common vulnerabilities",
        assessmentWeight: 0.25,
      },
    ],
    outcomes: [
      "Build and deploy smart contracts on Ethereum",
      "Develop DeFi protocols and applications",
      "Implement security best practices",
      "Understand blockchain architecture deeply",
      "Create token contracts and NFTs",
    ],
    assessments: [
      {
        id: "blockchain-knowledge-check",
        title: "Blockchain Fundamentals Assessment",
        type: "knowledge-check",
        position: "course-end",
        courseId: "blockchain-fundamentals",
        duration: 30,
        passingScore: 80,
        skills: ["blockchain-concepts"],
        isRequired: true,
        questions: [], // Will be populated
      },
      {
        id: "solidity-coding-challenge",
        title: "Smart Contract Development Challenge",
        type: "skill-assessment",
        position: "course-end",
        courseId: "solidity-basics",
        duration: 90,
        passingScore: 75,
        skills: ["solidity-programming", "security-best-practices"],
        isRequired: true,
        questions: [], // Will be populated
      },
      {
        id: "defi-project-assessment",
        title: "DeFi Protocol Implementation",
        type: "project-review",
        position: "path-final",
        duration: 180,
        passingScore: 80,
        skills: ["defi-development", "solidity-programming", "security-best-practices"],
        isRequired: true,
        questions: [], // Will be populated
      },
    ],
  },
  {
    id: "ai-ml-engineer",
    title: "AI/ML Engineer Track",
    description: "Master artificial intelligence and machine learning from theory to production deployment",
    category: "ai-ml",
    difficulty: "advanced",
    duration: 80,
    icon: Brain,
    color: "#06b6d4",
    gradient: "from-cyan-500 to-blue-600",
    prerequisites: ["Python", "Statistics", "Linear Algebra"],
    enrolledCount: 890,
    completionRate: 72,
    rating: 4.9,
    isNew: true,
    thumbnailUrl: "/placeholder.svg?width=400&height=200",
    tags: ["ai", "machine-learning", "deep-learning", "python"],
    createdBy: "Prof. Alex Rodriguez",
    lastUpdated: new Date("2024-01-20"),
    courses: [
      {
        courseId: "ai-machine-learning",
        order: 1,
        isRequired: true,
        estimatedHours: 20,
        description: "Comprehensive introduction to AI and ML",
      },
      {
        courseId: "deep-learning-fundamentals",
        order: 2,
        isRequired: true,
        estimatedHours: 24,
        prerequisites: ["ai-machine-learning"],
        description: "Neural networks and deep learning",
      },
      {
        courseId: "ml-production-deployment",
        order: 3,
        isRequired: true,
        estimatedHours: 18,
        prerequisites: ["deep-learning-fundamentals"],
        description: "Deploying ML models to production",
      },
      {
        courseId: "computer-vision",
        order: 4,
        isRequired: false,
        estimatedHours: 18,
        prerequisites: ["deep-learning-fundamentals"],
        description: "Computer vision and image processing",
      },
    ],
    skills: [
      {
        id: "ml-algorithms",
        name: "Machine Learning Algorithms",
        level: "advanced",
        category: "Core Knowledge",
        description: "Understanding and implementing various ML algorithms",
        assessmentWeight: 0.25,
      },
      {
        id: "deep-learning",
        name: "Deep Learning",
        level: "advanced",
        category: "Specialized Knowledge",
        description: "Neural networks, CNNs, RNNs, and transformer architectures",
        assessmentWeight: 0.3,
      },
      {
        id: "python-ml",
        name: "Python for ML",
        level: "advanced",
        category: "Programming",
        description: "Proficiency with Python ML libraries (TensorFlow, PyTorch, scikit-learn)",
        assessmentWeight: 0.25,
      },
      {
        id: "ml-ops",
        name: "MLOps",
        level: "intermediate",
        category: "Operations",
        description: "Model deployment, monitoring, and production best practices",
        assessmentWeight: 0.2,
      },
    ],
    outcomes: [
      "Implement machine learning algorithms from scratch",
      "Build and train deep neural networks",
      "Deploy ML models to production",
      "Optimize model performance and scalability",
      "Apply ML to real-world problems",
    ],
    assessments: [
      {
        id: "ml-theory-assessment",
        title: "Machine Learning Theory Assessment",
        type: "knowledge-check",
        position: "course-end",
        courseId: "ai-machine-learning",
        duration: 45,
        passingScore: 85,
        skills: ["ml-algorithms"],
        isRequired: true,
        questions: [],
      },
      {
        id: "deep-learning-project",
        title: "Deep Learning Implementation Project",
        type: "skill-assessment",
        position: "course-end",
        courseId: "deep-learning-fundamentals",
        duration: 120,
        passingScore: 80,
        skills: ["deep-learning", "python-ml"],
        isRequired: true,
        questions: [],
      },
      {
        id: "ml-capstone-project",
        title: "ML Engineering Capstone",
        type: "final-exam",
        position: "path-final",
        duration: 240,
        passingScore: 85,
        skills: ["ml-algorithms", "deep-learning", "python-ml", "ml-ops"],
        isRequired: true,
        questions: [],
      },
    ],
  },
  {
    id: "full-stack-web-developer",
    title: "Full Stack Web Developer",
    description: "Complete web development journey from frontend to backend and deployment",
    category: "full-stack",
    difficulty: "beginner",
    duration: 45,
    icon: Globe,
    color: "#3b82f6",
    gradient: "from-blue-500 to-indigo-600",
    prerequisites: ["Basic HTML/CSS", "JavaScript Basics"],
    enrolledCount: 3200,
    completionRate: 85,
    rating: 4.7,
    isFeatured: true,
    thumbnailUrl: "/placeholder.svg?width=400&height=200",
    tags: ["web-development", "react", "node", "full-stack"],
    createdBy: "Emma Thompson",
    lastUpdated: new Date("2024-01-18"),
    courses: [
      {
        courseId: "react-fundamentals",
        order: 1,
        isRequired: true,
        estimatedHours: 15,
        description: "Modern React development with hooks and context",
      },
      {
        courseId: "react-advanced",
        order: 2,
        isRequired: true,
        estimatedHours: 16,
        prerequisites: ["react-fundamentals"],
        description: "Advanced React patterns and performance optimization",
      },
      {
        courseId: "node-backend",
        order: 3,
        isRequired: true,
        estimatedHours: 14,
        description: "Building REST APIs with Node.js and Express",
      },
    ],
    skills: [
      {
        id: "react-development",
        name: "React Development",
        level: "advanced",
        category: "Frontend",
        description: "Building modern React applications with best practices",
        assessmentWeight: 0.35,
      },
      {
        id: "backend-apis",
        name: "Backend API Development",
        level: "intermediate",
        category: "Backend",
        description: "Creating RESTful APIs and handling data persistence",
        assessmentWeight: 0.3,
      },
      {
        id: "database-design",
        name: "Database Design",
        level: "intermediate",
        category: "Data",
        description: "Designing and implementing database schemas",
        assessmentWeight: 0.2,
      },
      {
        id: "deployment-devops",
        name: "Deployment & DevOps",
        level: "beginner",
        category: "Operations",
        description: "Deploying applications and basic DevOps practices",
        assessmentWeight: 0.15,
      },
    ],
    outcomes: [
      "Build responsive React applications",
      "Create RESTful APIs with Node.js",
      "Design and implement databases",
      "Deploy full-stack applications",
      "Implement authentication and authorization",
    ],
    assessments: [
      {
        id: "react-skills-assessment",
        title: "React Development Skills",
        type: "skill-assessment",
        position: "course-end",
        courseId: "react-advanced",
        duration: 90,
        passingScore: 75,
        skills: ["react-development"],
        isRequired: true,
        questions: [],
      },
      {
        id: "full-stack-project",
        title: "Full Stack Application Project",
        type: "project-review",
        position: "path-final",
        duration: 180,
        passingScore: 80,
        skills: ["react-development", "backend-apis", "database-design", "deployment-devops"],
        isRequired: true,
        questions: [],
      },
    ],
  },
]

// Utility functions
export function getPathProgress(pathId: string, userProgress: UserPathProgress): number {
  return userProgress.overallProgress || 0
}

export function getNextCourse(pathId: string, userProgress: UserPathProgress): PathCourse | null {
  const path = LEARNING_PATHS.find((p) => p.id === pathId)
  if (!path) return null

  const nextCourse = path.courses.find((course) => !userProgress.completedCourses.includes(course.courseId))

  return nextCourse || null
}

export function getPathDuration(pathId: string): number {
  const path = LEARNING_PATHS.find((p) => p.id === pathId)
  return path?.duration || 0
}

export function getRequiredAssessments(pathId: string): PathAssessment[] {
  const path = LEARNING_PATHS.find((p) => p.id === pathId)
  return path?.assessments.filter((a) => a.isRequired) || []
}

export function calculateSkillProgress(skillId: string, assessmentResults: AssessmentResult[]): number {
  const relevantResults = assessmentResults.filter((result) => result.skillScores[skillId] !== undefined)

  if (relevantResults.length === 0) return 0

  const totalScore = relevantResults.reduce((sum, result) => sum + result.skillScores[skillId], 0)

  return Math.round(totalScore / relevantResults.length)
}
