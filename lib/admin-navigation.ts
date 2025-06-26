import {
  Home,
  User,
  Briefcase,
  Code,
  Palette,
  Settings,
  FileText,
  Youtube,
  Github,
  BarChart3,
  Bell,
  Shield,
  Database,
  Zap,
  Globe,
  Mail,
  HelpCircle,
  type LucideIcon,
} from "lucide-react"

export interface NavigationItem {
  id: string
  title: string
  href?: string
  icon?: LucideIcon
  badge?: string | number
  children?: NavigationItem[]
  isCollapsible?: boolean
  defaultOpen?: boolean
  description?: string
}

export const adminNavigation: NavigationItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: Home,
    description: "Overview and analytics",
  },
  {
    id: "profile-management",
    title: "Profile",
    icon: User,
    isCollapsible: true,
    defaultOpen: true,
    description: "Manage your profile information",
    children: [
      {
        id: "edit-profile",
        title: "Edit Profile",
        href: "/dashboard/profile",
        icon: User,
        description: "Update personal information",
      },
      {
        id: "skills",
        title: "Skills",
        href: "/dashboard/skills",
        icon: Zap,
        description: "Manage your technical skills",
      },
      {
        id: "experience",
        title: "Experience",
        href: "/dashboard/experience",
        icon: Briefcase,
        description: "Add work experience",
      },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    icon: Code,
    isCollapsible: true,
    defaultOpen: false,
    description: "Manage your project portfolio",
    children: [
      {
        id: "github-projects",
        title: "GitHub Projects",
        href: "/dashboard/projects",
        icon: Github,
        // badge: "Auto-sync",
        description: "Sync projects from GitHub",
      },
      {
        id: "custom-projects",
        title: "Custom Projects",
        href: "/dashboard/projects/custom",
        icon: Code,
        description: "Add custom projects",
      },
    ],
  },
  {
    id: "content",
    title: "Content",
    icon: FileText,
    isCollapsible: true,
    defaultOpen: false,
    description: "Manage articles and media",
    children: [
      {
        id: "articles",
        title: "Articles",
        href: "/dashboard/content/articles",
        icon: FileText,
        description: "Manage blog posts and articles",
      },
      {
        id: "youtube",
        title: "YouTube Videos",
        href: "/dashboard/content/youtube",
        icon: Youtube,
        description: "Manage video content",
      },
      {
        id: "media-library",
        title: "Media Library",
        href: "/dashboard/content/media",
        icon: Database,
        description: "Manage uploaded files",
      },
    ],
  },
  {
    id: "customization",
    title: "Customization",
    icon: Palette,
    isCollapsible: true,
    defaultOpen: false,
    description: "Customize your profile appearance",
    children: [
      {
        id: "page-customization",
        title: "Page Design",
        href: "/dashboard/customize",
        icon: Palette,
        description: "Custom CSS and styling",
      },
      {
        id: "theme-settings",
        title: "Theme Settings",
        href: "/dashboard/customize/theme",
        icon: Settings,
        description: "Color schemes and layouts",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics",
    icon: BarChart3,
    isCollapsible: true,
    defaultOpen: false,
    description: "Track your profile performance",
    children: [
      {
        id: "profile-views",
        title: "Profile Views",
        href: "/dashboard/analytics/views",
        icon: BarChart3,
        description: "View profile statistics",
      },
      {
        id: "contact-requests",
        title: "Contact Requests",
        href: "/dashboard/analytics/contacts",
        icon: Mail,
        badge: 3,
        description: "Manage contact inquiries",
      },
    ],
  },
  {
    id: "settings",
    title: "Settings",
    icon: Settings,
    isCollapsible: true,
    defaultOpen: false,
    description: "Account and system settings",
    children: [
      {
        id: "account-settings",
        title: "Account Settings",
        href: "/dashboard/settings/account",
        icon: User,
        description: "Account preferences",
      },
      {
        id: "notifications",
        title: "Notifications",
        href: "/dashboard/settings/notifications",
        icon: Bell,
        description: "Notification preferences",
      },
      {
        id: "privacy",
        title: "Privacy & Security",
        href: "/dashboard/settings/privacy",
        icon: Shield,
        description: "Privacy and security settings",
      },
      {
        id: "integrations",
        title: "Integrations",
        href: "/dashboard/settings/integrations",
        icon: Globe,
        description: "Third-party integrations",
      },
    ],
  },
  {
    id: "help",
    title: "Help & Support",
    icon: HelpCircle,
    isCollapsible: true,
    defaultOpen: false,
    description: "Get help and support",
    children: [
      {
        id: "documentation",
        title: "Documentation",
        href: "/dashboard/help/docs",
        icon: FileText,
        description: "User guides and tutorials",
      },
      {
        id: "support",
        title: "Contact Support",
        href: "/dashboard/help/support",
        icon: Mail,
        description: "Get help from our team",
      },
    ],
  },
]

// Helper function to find navigation item by href
export function findNavigationItem(items: NavigationItem[], href: string): NavigationItem | null {
  for (const item of items) {
    if (item.href === href) {
      return item
    }
    if (item.children) {
      const found = findNavigationItem(item.children, href)
      if (found) return found
    }
  }
  return null
}

// Helper function to get all navigation items (flattened)
export function getAllNavigationItems(items: NavigationItem[]): NavigationItem[] {
  const result: NavigationItem[] = []

  function traverse(items: NavigationItem[]) {
    for (const item of items) {
      if (item.href) {
        result.push(item)
      }
      if (item.children) {
        traverse(item.children)
      }
    }
  }

  traverse(items)
  return result
}

// Helper function to check if a navigation section should be expanded based on current path
export function shouldExpandSection(item: NavigationItem, currentPath: string): boolean {
  if (item.href === currentPath) return true
  if (item.children) {
    return item.children.some((child) => shouldExpandSection(child, currentPath))
  }
  return false
}
