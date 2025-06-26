"use server"

import type { Article } from "@/lib/types"

export async function saveArticles(payload: { articles: Article[] }) {
  // ⬇️ TODO: Replace this with real DB logic.
  console.log("✅  [server] saving articles...", payload)

  // e.g. await db.updateUserArticles(userId, payload.articles)
  // revalidatePath(`/admin/dashboard/content/articles`)

  return { success: true }
}
