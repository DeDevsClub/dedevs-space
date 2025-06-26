"use server"

export async function saveProfile(payload: Record<string, unknown>) {
  console.log("✅  [server] saving profile", payload)
  return { success: true }
}
