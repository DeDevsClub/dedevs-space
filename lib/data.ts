import type { DeveloperProfile } from "./types"
import { Github, Linkedin, Twitter, Youtube, Code, Brain } from "lucide-react"

export const mockDeveloperProfile: DeveloperProfile = {
  id: "dedevs-1",
  username: "bunsdev",
  name: "V. Alexander",
  avatarUrl: "/placeholder.svg?width=128&height=128",
  bio: "Passionate Blockchain and AI developer with 5+ years of experience in building decentralized applications and intelligent systems. Proven ability to design, develop, and deploy innovative solutions. Constantly exploring new technologies to push the boundaries of what's possible.",
  tagline: "Building the Future with Code & Intelligence",
  email: "buns@dedevs.club",
  skills: [
    { id: "s1", name: "Solidity", icon: Code, level: "Expert", category: "Blockchain", proficiency: "Advanced" },
    { id: "s2", name: "Ethereum", icon: Code, level: "Expert", category: "Blockchain", proficiency: "Advanced" },
    { id: "s3", name: "Hardhat", icon: Code, level: "Advanced", category: "Blockchain", proficiency: "Advanced" },
    { id: "s4", name: "Python", icon: Code, level: "Expert", category: "AI", proficiency: "Advanced" },
    { id: "s5", name: "TensorFlow", icon: Brain, level: "Advanced", category: "AI", proficiency: "Advanced" },
    { id: "s6", name: "PyTorch", icon: Brain, level: "Advanced", category: "AI", proficiency: "Advanced" },
    { id: "s7", name: "Next.js", icon: Code, level: "Intermediate", category: "Web Development", proficiency: "Intermediate" },
    { id: "s8", name: "Node.js", icon: Code, level: "Advanced", category: "Web Development", proficiency: "Advanced" },
    { id: "s9", name: "IPFS", icon: Code, level: "Intermediate", category: "Web Development", proficiency: "Intermediate" },
    { id: "s10", name: "Machine Learning", icon: Brain, level: "Advanced", category: "AI", proficiency: "Advanced" },
  ],
  experience: [
    {
      id: "e1",
      title: "Senior Blockchain Engineer",
      company: "Decentralize Solutions Inc.",
      startDate: "Jan 2021",
      endDate: "Present",
      description:
        "Lead development of smart contracts and backend systems for DeFi protocols. Integrated AI for fraud detection in transactions.",
      technologies: ["Solidity", "Node.js", "Python", "AWS"],
    },
    {
      id: "e2",
      title: "AI Developer",
      company: "IntelliCorp",
      startDate: "Jun 2018",
      endDate: "Dec 2020",
      description:
        "Developed machine learning models for natural language processing and computer vision projects. Deployed models to production environments.",
      technologies: ["Python", "TensorFlow", "PyTorch", "Docker", "Kubernetes"],
    },
  ],
  projects: [
    {
      id: "p1",
      name: "DeDevs Space",
      description:
        "A decentralized space for developers to showcase their skills and projects.",
      html_url: "https://github.com/bunsdev/defi-lending",
      stargazers_count: 150,
      forks_count: 30,
      language: "Solidity",
      topics: ["defi", "ethereum", "solidity", "smart-contracts"],
      imageUrl: "/placeholder.svg?width=400&height=200",
    },
    {
      id: "p2",
      name: "AI Art Generator",
      description: "A web application that uses GANs to generate unique digital art based on user prompts.",
      html_url: "https://github.com/bunsdev/ai-art-generator",
      stargazers_count: 200,
      forks_count: 45,
      language: "Python",
      topics: ["ai", "machine-learning", "gans", "art-generation", "nextjs"],
      imageUrl: "/placeholder.svg?width=400&height=200",
    },
    {
      id: "p3",
      name: "NFT Marketplace",
      description: "A feature-rich NFT marketplace with auction capabilities and royalties, built on Polygon.",
      html_url: "https://github.com/bunsdev/nft-marketplace",
      stargazers_count: 120,
      forks_count: 25,
      language: "Solidity",
      topics: ["nft", "marketplace", "polygon", "blockchain"],
      imageUrl: "/placeholder.svg?width=400&height=200",
    },
  ],
  articles: [
    {
      id: "a1",
      title: "The Future of Decentralized Finance (DeFi)",
      url: "#", // Placeholder
      platform: "Medium",
      publishDate: "Mar 2023",
      date: "Mar 2023",
    },
    {
      id: "a2",
      title: "Getting Started with AI in Blockchain Applications",
      url: "#", // Placeholder
      platform: "Dev.to",
      publishDate: "Jan 2023",
      date: "Jan 2023",
    },
  ],
  youtubeVideos: [
    {
      id: "yt1",
      title: "Tutorial: Building Your First Smart Contract",
      videoId: "dQw4w9WgXcQ", // Placeholder (Rick Astley)
      thumbnailUrl: "/placeholder.svg?width=320&height=180",
      uploadDate: "Oct 2022",
      embedUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "yt2",
      title: "Exploring AI-Powered Oracles for Blockchains",
      videoId: "oHg5SJYRHA0", // Placeholder (Another one)
      thumbnailUrl: "/placeholder.svg?width=320&height=180",
      uploadDate: "Sep 2022",
      embedUrl: "https://www.youtube.com/embed/oHg5SJYRHA0",
    },
  ],
  socialLinks: [
    { id: "sl1", platform: "GitHub", url: "https://github.com/bunsdev", icon: Github },
    { id: "sl2", platform: "LinkedIn", url: "https://linkedin.com/in/bunsdev", icon: Linkedin },
    { id: "sl3", platform: "Twitter", url: "https://x.com/bunsdev", icon: Twitter },
    { id: "sl4", platform: "YouTube", url: "https://www.youtube.com/@0xbuns", icon: Youtube },
  ],
  customCSS: `
    /* Example: .hero-section { background-color: #f0f8ff; } */
    /* .skills-section .skill-card { border-color: #007bff; } */
  `,
}

// Function to get profile by username (mock)
export async function getDeveloperProfileByUsername(username: string): Promise<DeveloperProfile | null> {
  if (username === mockDeveloperProfile.username) {
    return mockDeveloperProfile
  }
  return null
}
