"use client" // Add this directive

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { mockDeveloperProfile } from "@/lib/data" // For pre-filling form
import { useState, useEffect } from "react"
import ImageUploader from "@/components/admin/image-uploader"
import type { SocialLink } from "@/lib/types"
import { PlusCircle, Trash2 } from "lucide-react"
import { saveProfile } from "./actions"

export default function EditProfilePage() {
  // In a real app, fetch current user's profile data and set it here
  const [name, setName] = useState(mockDeveloperProfile.name)
  const [username, setUsername] = useState(mockDeveloperProfile.username)
  const [tagline, setTagline] = useState(mockDeveloperProfile.tagline)
  const [email, setEmail] = useState(mockDeveloperProfile.email)
  const [avatarUrl, setAvatarUrl] = useState(mockDeveloperProfile.avatarUrl)
  const [bio, setBio] = useState(mockDeveloperProfile.bio)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(mockDeveloperProfile.socialLinks || [])

  // Simulate fetching initial data (if needed, or rely on mock)
  useEffect(() => {
    // If you were fetching data:
    // const fetchData = async () => {
    //   const profileData = await getSomeProfileData(); // Replace with actual fetch
    //   setName(profileData.name);
    //   // ... set other states
    //   setAvatarUrl(profileData.avatarUrl);
    //   setSocialLinks(profileData.socialLinks);
    // };
    // fetchData();
  }, [])

  const handleAvatarUploadComplete = (url: string) => {
    setAvatarUrl(url)
    // Here you might also trigger a save of just the avatar URL
    console.log("New avatar URL (simulated):", url)
    void saveProfile({ avatarUrl: url })
  }

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { id: `new-${Date.now()}`, platform: "", url: "" }])
  }

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const updatedLinks = [...socialLinks]
    updatedLinks[index] = { ...updatedLinks[index], [field]: value }
    setSocialLinks(updatedLinks)
  }

  const handleRemoveSocialLink = (index: number) => {
    setSocialLinks(socialLinks.filter((_, i) => i !== index))
  }

  // Server action to handle form submission
  // async function handleSubmit(formData: FormData) {
  //   "use server"
  //   // Process and save data to DB
  //   const profileData = {
  //     name: formData.get("name") as string,
  //     username: formData.get("username") as string,
  //     tagline: formData.get("tagline") as string,
  //     email: formData.get("email") as string,
  //     bio: formData.get("bio") as string,
  //     avatarUrl: formData.get("avatarUrl") as string, // This will be the hidden input
  //     socialLinks: socialLinks, // Send the state directly
  //   }
  //   console.log("Saving profile:", profileData)
  //   // Revalidate path or redirect
  //   // e.g. revalidatePath(`/${profileData.username}`)
  // }

  const handleSubmit = async (formData: FormData) => {
    const profileData = {
      name: formData.get("name") as string,
      username: formData.get("username") as string,
      tagline: formData.get("tagline") as string,
      email: formData.get("email") as string,
      bio: formData.get("bio") as string,
      avatarUrl: formData.get("avatarUrl") as string, // This will be the hidden input
      socialLinks: socialLinks, // Send the state directly
    }
    void saveProfile(profileData)
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-background p-2 sm:p-6">
      <Card className="flex flex-col w-full max-w-screen-lg mx-auto shadow-lg">
        <CardHeader className="flex flex-col items-center">
          <CardTitle>Edit Your Profile</CardTitle>
          <CardDescription>Update your personal information and public-facing details.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <form action={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1 flex flex-col items-center md:items-start">
                <h3 className="text-lg font-medium mb-2">Avatar</h3>
                <ImageUploader
                  onUploadComplete={handleAvatarUploadComplete}
                  initialImageUrl={avatarUrl}
                  label="Profile Picture"
                />
                <Input type="hidden" name="avatarUrl" value={avatarUrl} />
              </div>
              <div className="md:col-span-2 space-y-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required className="w-full" />
                </div>
                <div>
                  <Label htmlFor="username">Username (URL Slug)</Label>
                  <Input
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Your profile will be at: /<span className="font-medium">{username || "{username}"}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="tagline">Tagline / Headline</Label>
                <Input id="tagline" name="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full" />
              </div>
              <div>
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio / About Me</Label>
                <Textarea id="bio" name="bio" rows={5} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full" />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2">Social Media Links</h3>
              {socialLinks.map((link, index) => (
                <div
                  key={link.id}
                  className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 mb-3 p-3 border rounded-md"
                >
                  <div className="flex-1">
                    <Label htmlFor={`social-platform-${index}`}>Platform</Label>
                    <Input
                      id={`social-platform-${index}`}
                      value={link.platform}
                      onChange={(e) => handleSocialLinkChange(index, "platform", e.target.value)}
                      placeholder="e.g., GitHub, LinkedIn"
                      className="w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <Label htmlFor={`social-url-${index}`}>URL</Label>
                    <Input
                      id={`social-url-${index}`}
                      value={link.url}
                      onChange={(e) => handleSocialLinkChange(index, "url", e.target.value)}
                      placeholder="https://..."
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSocialLink(index)}
                    aria-label="Remove social link"
                    className="self-center sm:self-end"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={handleAddSocialLink} className="mt-2 w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Social Link
              </Button>
            </div>

            <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
