"use server"

import type { YouTubeVideo } from "@/lib/types"

export async function saveYouTubeVideos(payload: { videos: YouTubeVideo[] }) {
  console.log("✅  [server] saving YouTube video...", payload)
  return { success: true }
}
