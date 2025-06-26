"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import type { YouTubeVideo } from "@/lib/types"
import { mockDeveloperProfile } from "@/lib/data"
import Image from "next/image" // For thumbnail preview
import { saveYouTubeVideos } from "./actions"

export default function ManageYouTubePage() {
  const [videos, setVideos] = useState<YouTubeVideo[]>(mockDeveloperProfile.youtubeVideos || [])
  const [currentVideo, setCurrentVideo] = useState<Partial<YouTubeVideo>>({
    title: "",
    videoId: "",
    thumbnailUrl: "", // Optional, can be auto-generated or manually set
    uploadDate: "",
  })

  const handleInputChange = (field: keyof YouTubeVideo, value: string) => {
    setCurrentVideo((prev) => ({ ...prev, [field]: value }))
    if (field === "videoId" && value.trim()) {
      // Auto-generate thumbnail URL if videoId is provided
      setCurrentVideo((prev) => ({ ...prev, thumbnailUrl: `https://i.ytimg.com/vi/${value.trim()}/hqdefault.jpg` }))
    }
  }

  const handleAddVideo = () => {
    if (!currentVideo.title?.trim() || !currentVideo.videoId?.trim()) return

    const newVideo: YouTubeVideo = {
      id: `yt-${Date.now()}`,
      ...currentVideo,
      title: currentVideo.title!,
      videoId: currentVideo.videoId!,
      embedUrl: `https://www.youtube.com/embed/${currentVideo.videoId}`,
    }
    const updatedList = [...videos, newVideo]
    setVideos(updatedList)
    setCurrentVideo({ title: "", videoId: "", thumbnailUrl: "", uploadDate: "" })
    void saveYouTubeVideos({ videos: updatedList })
  }

  const handleRemoveVideo = (videoId: string) => {
    const updatedList = videos.filter((vid) => vid.id !== videoId)
    setVideos(updatedList)
    void saveYouTubeVideos({ videos: updatedList })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add YouTube Video</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="yt-title">Video Title</Label>
            <Input
              id="yt-title"
              value={currentVideo.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="yt-videoId">Video ID</Label>
            <Input
              id="yt-videoId"
              placeholder="e.g., dQw4w9WgXcQ"
              value={currentVideo.videoId}
              onChange={(e) => handleInputChange("videoId", e.target.value)}
            />
            <p className="text-xs text-muted-foreground mt-1">
              The ID from the YouTube URL (e.g., youtube.com/watch?v=VIDEO_ID)
            </p>
          </div>
          {currentVideo.thumbnailUrl && (
            <div>
              <Label>Thumbnail Preview</Label>
              <Image
                src={currentVideo.thumbnailUrl || "/placeholder.svg"}
                alt="Thumbnail Preview"
                width={160}
                height={90}
                className="rounded border"
              />
            </div>
          )}
          <div>
            <Label htmlFor="yt-thumbnailUrl">Thumbnail URL (optional)</Label>
            <Input
              id="yt-thumbnailUrl"
              type="url"
              placeholder="Overrides auto-generated thumbnail"
              value={currentVideo.thumbnailUrl}
              onChange={(e) => handleInputChange("thumbnailUrl", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="yt-uploadDate">Upload Date (optional)</Label>
            <Input
              id="yt-uploadDate"
              type="text"
              placeholder="e.g., Oct 2022"
              value={currentVideo.uploadDate}
              onChange={(e) => handleInputChange("uploadDate", e.target.value)}
            />
          </div>
          <Button onClick={handleAddVideo} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Video
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current YouTube Videos</CardTitle>
        </CardHeader>
        <CardContent>
          {videos.length === 0 ? (
            <p className="text-muted-foreground">No videos added yet.</p>
          ) : (
            <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videos.map((vid) => (
                <li key={vid.id} className="p-3 border rounded-md">
                  {vid.thumbnailUrl && (
                    <a
                      href={`https://www.youtube.com/watch?v=${vid.videoId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Image
                        src={vid.thumbnailUrl || "/placeholder.svg"}
                        alt={vid.title}
                        width={320}
                        height={180}
                        className="w-full aspect-video object-cover rounded-md mb-2"
                      />
                    </a>
                  )}
                  <div className="flex items-start justify-between">
                    <div>
                      <a
                        href={`https://www.youtube.com/watch?v=${vid.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline text-sm leading-tight"
                      >
                        {vid.title}
                      </a>
                      {vid.uploadDate && <p className="text-xs text-muted-foreground">{vid.uploadDate}</p>}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveVideo(vid.id)}
                      aria-label="Remove video"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
