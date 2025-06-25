import type React from "react"
import type { SocialLink } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Twitter, Youtube, LinkIcon } from "lucide-react" // Default icons

interface SocialLinksProps {
  socialLinks: SocialLink[]
}

const iconMap: { [key: string]: React.ElementType } = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
}

export default function SocialLinks({ socialLinks }: SocialLinksProps) {
  if (!socialLinks || socialLinks.length === 0) return null

  return (
    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
      {socialLinks.map((link) => {
        const IconComponent = link.icon || iconMap[link.platform.toLowerCase()] || LinkIcon
        return (
          <Button
            key={link.id}
            variant="outline"
            size="icon"
            asChild
            className="bg-background hover:bg-accent text-accent-foreground border-primary/50 hover:border-primary"
          >
            <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
              <IconComponent className="h-5 w-5" />
            </a>
          </Button>
        )
      })}
    </div>
  )
}
