"use client"

import { getDeveloperProfileByUsername } from "@/lib/data" // Using mock for now
import type { DeveloperProfile } from "@/lib/types"
import HeroSection from "@/components/portfolio/hero-section"
import SkillsSection from "@/components/portfolio/skills-section"
import ExperienceSection from "@/components/portfolio/experience-section"
import ProjectsSection from "@/components/portfolio/projects-section"
import ArticlesSection from "@/components/portfolio/articles-section"
import YouTubeSection from "@/components/portfolio/youtube-section"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

interface DeveloperPageProps {
  params: { username: string }
}

// This function would fetch data from your DB or CMS in a real app
async function fetchDeveloperProfile(username: string): Promise<DeveloperProfile | null> {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getDeveloperProfileByUsername(username)
}

export default function DeveloperPageClient({ params }: DeveloperPageProps) {
  const [profile, setProfile] = useState<DeveloperProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadProfile() {
      setLoading(true)
      const fetchedProfile = await fetchDeveloperProfile(params.username)
      setProfile(fetchedProfile)
      setLoading(false)
    }

    loadProfile()
  }, [params.username])

  if (loading) {
    return <div>Loading...</div> // Or a more sophisticated loading indicator
  }

  if (!profile) {
    notFound() // Triggers the not-found.tsx or default Next.js 404 page
  }

  return (
    <div className="bg-background text-foreground">
      {profile.customCSS && (
        <style jsx global>{`
          /* Developer Custom CSS */
          ${profile.customCSS}
        `}</style>
      )}
      <HeroSection
        profile={{
          name: profile.name,
          avatarUrl: profile.avatarUrl,
          tagline: profile.tagline,
          bio: profile.bio,
          email: profile.email,
          socialLinks: profile.socialLinks,
        }}
      />
      <SkillsSection skills={profile.skills} />
      <ExperienceSection experience={profile.experience} />
      <ProjectsSection username={profile.username} />
      <ArticlesSection articles={profile.articles} />
      <YouTubeSection videos={profile.youtubeVideos} />
      {/* Add other sections as needed */}
      <footer className="text-center py-8 text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>Powered by Next.js & Vercel</p>
      </footer>
    </div>
  )
}
