import { notFound } from "next/navigation"
import SharingProfile from "@/components/sharing/sharing-profile"
import { getMockSharingProfile } from "@/lib/sharing"
import type { Metadata } from "next"

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
    <div className="flex flex-1 flex-col w-full h-full mx-auto bg-neutral-600 dark:bg-neutral-950">
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SharingProfile profile={profile} />
      </div>
    </div>
  </div>
  )
}
