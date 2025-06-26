import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { FileText, YoutubeIcon } from "lucide-react"

export default function ManageContentPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Content</CardTitle>
          <CardDescription>Add and update links to your articles, blog posts, and YouTube videos.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">Articles & Blog Posts</CardTitle>
              <FileText className="h-6 w-6 text-primary" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Share your written content from platforms like Medium, Dev.to, or your personal blog.
              </p>
              <Button asChild className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                <Link href="/admin/dashboard/content/articles">Manage Articles</Link>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-medium">YouTube Videos</CardTitle>
              <YoutubeIcon className="h-6 w-6 text-red-600" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Showcase your video tutorials, talks, or project demos from YouTube.
              </p>
              <Button asChild className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground">
                <Link href="/admin/dashboard/content/youtube">Manage YouTube Videos</Link>
              </Button>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  )
}
