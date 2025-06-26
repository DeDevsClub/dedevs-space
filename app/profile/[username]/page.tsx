import { notFound } from "next/navigation"
import SharingProfile from "@/components/sharing/sharing-profile"
import { getMockSharingProfile } from "@/lib/sharing"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/navigation/site-header"

interface ProfilePageProps {
  params: { username: string }
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  const profile = await getMockSharingProfile(params?.username)

  if (!profile) {
    return {
      title: "Profile Not Found",
    }
  }

  return {
    title: `${profile.displayName} (@${profile.username}) - Developer Profile`,
    description: profile.bio,
    openGraph: {
      title: `${profile.displayName} - Developer Profile`,
      description: profile.bio,
      images: [{ url: profile.avatarUrl }],
      type: "profile",
      username: profile.username,
    },
    twitter: {
      card: "summary_large_image",
      title: `${profile.displayName} - Developer Profile`,
      description: profile.bio,
      images: [profile.avatarUrl],
    },
  }
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getMockSharingProfile(params.username)

  if (!profile) {
    notFound()
  }

  return (
    <div className="min-h-screen min-w-screen bg-background">
      <div className="container mx-auto py-6 w-full">
        <SiteHeader />
        <SharingProfile profile={profile} />
      </div>
    </div>
  )
}
