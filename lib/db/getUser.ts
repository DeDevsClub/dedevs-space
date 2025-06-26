import type { DeveloperProfile } from "@/lib/types"
import developers from "@/data/developers.json"
import type { Metadata } from "next"

export function getDeveloperProfileByUsername(username: string): DeveloperProfile | null {
    const dev = (developers as DeveloperProfile[]).find(dev => dev.username === username)
    return dev || null
}


export async function generateMetadata({ params }: { params: { username: string } }): Promise<Metadata> {
  const profile = await getDeveloperProfileByUsername(params.username)
  if (!profile) {
    return { title: "Profile Not Found" }
  }
  return {
    title: `${profile.name} - ${profile.tagline}`,
    description: profile.bio.substring(0, 160),
    openGraph: {
      title: profile.name,
      description: profile.bio.substring(0, 160),
      images: [{ url: profile.avatarUrl }],
      type: "profile",
      username: profile.username,
    },
  }
}
