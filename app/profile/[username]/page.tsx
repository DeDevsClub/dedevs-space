import { notFound } from "next/navigation";
import SharingProfile from "@/components/sharing/sharing-profile";
import { getMockSharingProfile } from "@/lib/sharing";
import type { Metadata } from "next";

// interface ProfilePageProps {
  // params: { username: string };
// }

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getMockSharingProfile(
// params?.username
);

  if (!profile) {
    return {
      title: "Profile Not Found",
    };
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
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const profile = await getMockSharingProfile(params.username);

  if (!profile) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col w-full h-screen mx-auto justify-center">
      <div className="flex flex-col md:gap-6 py-2 px-2 h-full w-full justify-center items-center bg-neutral-600 dark:bg-neutral-800">
        <div className="flex flex-col gap-2 max-w-full w-full mx-auto border-2 border-primary rounded-xl bg-neutral-800 dark:bg-neutral-950 h-dvh justify-center items-center">
          <SharingProfile profile={profile} />
        </div>
      </div>
    </div>
  );
}
