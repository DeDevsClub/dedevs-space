import type { DeveloperProfile } from "@/lib/types"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Mail, Download } from "lucide-react"
import SocialLinks from "./social-links"

interface HeroSectionProps {
  profile: Pick<DeveloperProfile, "name" | "avatarUrl" | "tagline" | "bio" | "email" | "socialLinks">
}

export default function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/40 dark:bg-muted/20 hero-section">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          <div className="flex-shrink-0">
            <Image
              src={profile.avatarUrl || "/placeholder.svg"}
              alt={profile.name}
              width={160}
              height={160}
              className="rounded-full border-4 border-primary shadow-lg"
              priority
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{profile.name}</h1>
            <p className="mt-2 text-xl md:text-2xl text-primary font-medium">{profile.tagline}</p>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{profile.bio}</p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href={`mailto:${profile.email}`}>
                  <Mail className="mr-2 h-5 w-5" /> Contact Me
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-background hover:bg-accent text-accent-foreground border-primary"
              >
                <Download className="mr-2 h-5 w-5" /> Download CV
              </Button>
            </div>
            <div className="mt-6">
              <SocialLinks socialLinks={profile.socialLinks} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
