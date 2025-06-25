import DeveloperPageClient from "./DeveloperPageClient"
import { getDeveloperProfileByUsername } from "@/lib/data" // Using mock for now
import type { DeveloperProfile } from "@/lib/types"
import type { Metadata } from "next"

interface DeveloperPageProps {
  params: { username: string }
}

// This function would fetch data from your DB or CMS in a real app
async function fetchDeveloperProfile(username: string): Promise<DeveloperProfile | null> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getDeveloperProfileByUsername(username)
}

export async function generateMetadata({ params }: DeveloperPageProps): Promise<Metadata> {
  const profile = await fetchDeveloperProfile(params.username)
  if (!profile) {
    return {
      title: "Profile Not Found",
    }
  }
  return {
    title: `${profile.name} - ${profile.tagline}`,
    description: profile.bio.substring(0, 160), // Keep it concise for meta descriptions
    openGraph: {
      title: profile.name,
      description: profile.bio.substring(0, 160),
      images: [{ url: profile.avatarUrl }],
      type: "profile",
      username: profile.username,
    },
  }
}

export async function generateStaticParams() {
  // In a real app, fetch this list from your database
  const developers = [{ username: "bunsdev" } /* ...other developers */]
  return developers.map((dev) => ({
    username: dev.username,
  }))
}

export default function DeveloperPage({ params }: DeveloperPageProps) {
  return <DeveloperPageClient params={params} />
}
