"use server"

import type { Skill } from "@/lib/types"

export async function saveSkills(payload: { skills: Skill[] }) {
  console.log("✅  [server] saving skills", payload)
  return { success: true }
}
