'use client'

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Search, Code, Users, Globe } from "lucide-react"
import developers from "@/data/developers.json"

type Portfolio = typeof developers[number]

const TAGS = [
  "Blockchain",
  "AI",
  "Web Development",
  "Open Source",
  "Mentor",
  "Full Stack",
  "Frontend",
  "Backend",
]

export default function PortfoliosPage() {
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  // Simple filter logic
  const filtered = useMemo(() => {
    return developers.filter((dev: Portfolio) => {
      const matchesTag =
        !selectedTag ||
        dev.skills?.some((s: any) =>
          s.category?.toLowerCase() === selectedTag.toLowerCase()
        )
      const matchesSearch =
        !search ||
        dev.name.toLowerCase().includes(search.toLowerCase()) ||
        dev.username.toLowerCase().includes(search.toLowerCase()) ||
        dev.bio?.toLowerCase().includes(search.toLowerCase())
      return matchesTag && matchesSearch
    })
  }, [search, selectedTag])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-background to-indigo-950/60 py-10 px-2 md:px-6">
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-indigo-400 via-sky-400 to-blue-400 bg-clip-text text-transparent drop-shadow">
              Developer Portfolios
            </h1>
          </div>
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search developers, skills, or keywords..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="max-w-xs rounded-lg shadow"
            //   icon={<Search className="h-4 w-4 text-muted-foreground" />}
            />
          </div>
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2 mb-2">
          {TAGS.map(tag => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className={`cursor-pointer transition-all ${selectedTag === tag ? "scale-110 border-primary" : ""}`}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
          <Button
            size="sm"
            variant="ghost"
            className="ml-2"
            onClick={() => setSelectedTag(null)}
          >
            Clear
          </Button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground opacity-70 py-12">
              <span>No portfolios found. Try a different search or filter.</span>
            </div>
          )}
          {filtered.map(dev => (
            <PortfolioCard key={dev.username} dev={dev} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PortfolioCard({ dev }: { dev: Portfolio }) {
  return (
    <div className="group bg-card/80 rounded-2xl shadow-lg p-6 flex flex-col gap-4 items-center text-center border border-transparent hover:border-primary/40 hover:shadow-2xl transition-all duration-200 cursor-pointer hover:scale-105">
      <div className="relative">
        <img
          src={dev.avatarUrl || "/avatars/default.png"}
          alt={dev.name}
          className="w-20 h-20 rounded-full border-4 border-indigo-300 group-hover:border-primary shadow-lg transition-all"
        />
        <span className="absolute -bottom-2 right-0 bg-primary text-white text-xs rounded-full px-2 py-0.5 shadow">
          {dev.username}
        </span>
      </div>
      <div>
        <h3 className="font-bold text-lg">{dev.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2">{dev.tagline}</p>
      </div>
      <div className="flex flex-wrap gap-1 justify-center">
        {dev.skills?.slice(0, 3).map((s: any) => (
          <Badge key={s.id} variant="secondary" className="text-xs px-2 py-0.5">
            {s.name}
          </Badge>
        ))}
        {dev.skills?.length > 3 && (
          <Badge variant="outline" className="text-xs px-2 py-0.5">
            +{dev.skills.length - 3} more
          </Badge>
        )}
      </div>
      <div className="flex gap-2 justify-center mt-2">
        {dev.socialLinks?.map((link: any) => (
          <a
            key={link.platform}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
            title={link.platform}
          >
            {getSocialIcon(link.platform)}
          </a>
        ))}
      </div>
      <Button
        size="sm"
        variant="outline"
        className="mt-3 group-hover:bg-primary group-hover:text-white transition-all"
      >
        View Portfolio
      </Button>
    </div>
  )
}

function getSocialIcon(platform: string) {
  switch (platform.toLowerCase()) {
    case "github":
      return <Code className="h-5 w-5" />
    case "twitter":
      return <Users className="h-5 w-5" />
    case "website":
      return <Globe className="h-5 w-5" />
    default:
      return <Users className="h-5 w-5" />
  }
}