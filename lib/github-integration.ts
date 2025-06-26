export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  name: string
  company?: string
  blog?: string
  location?: string
  email?: string
  bio?: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description?: string
  html_url: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  language?: string
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  open_issues_count: number
}

export interface GitHubContribution {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export interface GitHubStats {
  user: GitHubUser
  repos: GitHubRepo[]
  totalStars: number
  totalForks: number
  totalCommits: number
  contributions: GitHubContribution[]
  topLanguages: { [key: string]: number }
  currentStreak: number
  longestStreak: number
}

// Mock GitHub API functions (replace with real API calls)
export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return {
    login: username,
    id: 12345,
    avatar_url: "/placeholder.svg?width=200&height=200",
    name: "DeDevsClub",
    company: "DeDevsClub",
    blog: "https://dedevs.space",
    location: "San Francisco, CA",
    email: "dedevsclub@gmail.com",
    bio: "Full-stack developer passionate about blockchain and AI",
    public_repos: 42,
    public_gists: 15,
    followers: 234,
    following: 89,
    created_at: "2018-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      id: 1,
      name: "dedevs-space",
      full_name: `${username}/dedevs-space`,
      description: "A decentralized lending and borrowing platform on Ethereum",
      html_url: `https://github.com/${username}/dedevs-space`,
      stargazers_count: 156,
      watchers_count: 156,
      forks_count: 34,
      language: "Solidity",
      topics: ["defi", "ethereum", "smart-contracts", "lending"],
      created_at: "2023-06-15T00:00:00Z",
      updated_at: "2024-01-10T00:00:00Z",
      pushed_at: "2024-01-10T00:00:00Z",
      size: 2048,
      open_issues_count: 3,
    },
    {
      id: 2,
      name: "dedevs-space",
      full_name: `${username}/dedevs-space`,
      description: "Generate unique digital art using GANs and machine learning",
      html_url: `https://github.com/${username}/dedevs-space`,
      stargazers_count: 89,
      watchers_count: 89,
      forks_count: 21,
      language: "Python",
      topics: ["ai", "machine-learning", "art", "gans"],
      created_at: "2023-03-20T00:00:00Z",
      updated_at: "2024-01-08T00:00:00Z",
      pushed_at: "2024-01-08T00:00:00Z",
      size: 1536,
      open_issues_count: 1,
    },
    // Add more mock repos...
  ]
}

export async function fetchGitHubContributions(username: string): Promise<GitHubContribution[]> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const contributions: GitHubContribution[] = []
  const today = new Date()

  // Generate mock contribution data for the last year
  for (let i = 365; i >= 0; i--) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)

    const count = Math.floor(Math.random() * 10)
    const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4

    contributions.push({
      date: date.toISOString().split("T")[0],
      count,
      level: level as 0 | 1 | 2 | 3 | 4,
    })
  }

  return contributions
}

export async function fetchGitHubStats(username: string): Promise<GitHubStats> {
  const [user, repos, contributions] = await Promise.all([
    fetchGitHubUser(username),
    fetchGitHubRepos(username),
    fetchGitHubContributions(username),
  ])

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0)
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0)
  const totalCommits = contributions.reduce((sum, day) => sum + day.count, 0)

  // Calculate top languages
  const languageCounts: { [key: string]: number } = {}
  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1
    }
  })

  // Calculate streaks
  let currentStreak = 0
  let longestStreak = 0
  let tempStreak = 0

  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) {
      tempStreak++
      if (i === contributions.length - 1) {
        currentStreak = tempStreak
      }
    } else {
      longestStreak = Math.max(longestStreak, tempStreak)
      tempStreak = 0
      if (currentStreak === 0) {
        currentStreak = 0
      }
    }
  }

  return {
    user,
    repos,
    totalStars,
    totalForks,
    totalCommits,
    contributions,
    topLanguages: languageCounts,
    currentStreak,
    longestStreak: Math.max(longestStreak, tempStreak),
  }
}
