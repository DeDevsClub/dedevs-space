"use server"

import type { ExperienceItem } from "@/lib/types"

export async function saveExperience(payload: { experience: ExperienceItem[] }) {
  console.log("✅  [server] saving experience", payload)
  return { success: true }
}
