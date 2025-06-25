import type { LucideIcon } from "lucide-react"

export interface SocialLink {
  id: string
  platform: string // e.g., 'github', 'linkedin', 'twitter', 'youtube'
  url: string
  icon?: LucideIcon // Optional: specific icon if needed beyond a generic one
}

export interface Skill {
  id: string
  name: string
  level?: "Beginner" | "Intermediate" | "Advanced" | "Expert" // Optional
  icon?: LucideIcon
}

export interface ExperienceItem {
  id: string
  title: string
  company: string
  startDate: string
  endDate?: string // Optional: for current roles
  description: string
  technologies?: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  html_url: string // GitHub URL
  stargazers_count?: number
  forks_count?: number
  language?: string
  topics?: string[]
  imageUrl?: string // Optional: custom image for the project
}

export interface Article {
  id: string
  title: string
  url: string
  platform: string // e.g., 'Medium', 'Dev.to', 'Personal Blog'
  publishDate?: string
}

export interface YouTubeVideo {
  id: string
  title: string
  videoId: string // YouTube video ID for embedding
  thumbnailUrl?: string
  uploadDate?: string
}

export interface DeveloperProfile {
  id: string
  username: string // Used for the URL slug
  name: string
  avatarUrl: string
  bio: string
  tagline: string // e.g., "Blockchain & AI Innovator"
  email: string
  skills: Skill[]
  experience: ExperienceItem[]
  projects: Project[] // Could be populated from GitHub
  articles: Article[]
  youtubeVideos: YouTubeVideo[]
  socialLinks: SocialLink[]
  customCSS?: string // For profile page personalization
}

export type LearnItem = {
    title: string;
    content: string;
    value: string;
    icon: string;
    cta?: string;
    ctaLabel?: string;
};
export interface ClientProfile {
    id: string;
    name: string;
    email: string;
    address: string;
    phone: string;
    joinedDate: string;
  }
  
  export interface VaultAccount {
    accountId: string;
    balance: number;
    currency: string;
    lastUpdated: string;
  }
  
  export interface Transaction {
    id: string;
    date: string;
    description: string;
    amount: number;
    currency: string;
    type: 'deposit' | 'withdrawal' | 'transfer' | 'payment';
    status: 'completed' | 'pending' | 'failed';
  }
  
  export interface AlertNotification {
    id: string;
    date: string;
    title: string;
    message: string;
    severity: 'info' | 'warning' | 'error' | 'success';
    read: boolean;
  }
  
  export interface SecuritySettings {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    loginAlertsEnabled: boolean;
  }
  
  // Placeholder data for demonstration
  export const mockClientProfile: ClientProfile = {
    id: 'client123',
    name: 'B. Enchantress',
    email: 'buns@dedevs.club',
    address: '123 Main St, Silicon Valley, CA',
    phone: '555-123-4567',
    joinedDate: '2025-06-25',
  };
  
  export const mockVaultAccount: VaultAccount = {
    accountId: 'vaultAcc789',
    balance: 12500.75,
    currency: 'USD',
    lastUpdated: new Date().toISOString(),
  };
  
  export const mockTransactions: Transaction[] = [
    {
      id: 'txn001',
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Initial Vault Funding',
      amount: 10000,
      currency: 'USD',
      type: 'deposit',
      status: 'completed',
    },
    {
      id: 'txn002',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Software License Purchase',
      amount: -299,
      currency: 'USD',
      type: 'payment',
      status: 'completed',
    },
    {
      id: 'txn003',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      description: 'Cloud Service Subscription',
      amount: -49.99,
      currency: 'USD',
      type: 'payment',
      status: 'pending',
    },
  ];
  
  export const mockAlerts: AlertNotification[] = [
    {
      id: 'alert001',
      date: new Date().toISOString(),
      title: 'Security Update Recommended',
      message: 'Please review your security settings and consider enabling two-factor authentication.',
      severity: 'warning',
      read: false,
    },
    {
      id: 'alert002',
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      title: 'Large Withdrawal Processed',
      message: 'A withdrawal of $5000 was successfully processed from your account.',
      severity: 'info',
      read: true,
    },
  ];
  
  export const mockSecuritySettings: SecuritySettings = {
    twoFactorEnabled: false,
    lastPasswordChange: '2023-05-01',
    loginAlertsEnabled: true,
  };
  