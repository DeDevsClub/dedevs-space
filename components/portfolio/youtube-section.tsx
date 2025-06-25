import type { YouTubeVideo } from "@/lib/types"
import Image from "next/image"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PlayCircle } from "lucide-react"

interface YouTubeSectionProps {
  videos: YouTubeVideo[]
}

export default function YouTubeSection({ videos }: YouTubeSectionProps) {
  if (!videos || videos.length === 0) return null

  return (
    <section className="py-12 md:py-16 youtube-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">My YouTube Content</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {videos.map((video) => (
            <Card key={video.id} className="overflow-hidden hover:shadow-xl transition-shadow">
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
              >
                <div className="relative w-full aspect-video">
                  <Image
                    src={
                      video.thumbnailUrl ||
                      `/placeholder.svg?width=320&height=180&query=youtube+video+${video.title.replace(/\s+/g, "+")}`
                    }
                    alt={video.title}
                    layout="fill"
                    objectFit="cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {video.title}
                  </CardTitle>
                  {video.uploadDate && <CardDescription>Uploaded: {video.uploadDate}</CardDescription>}
                </CardHeader>
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
