"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import type { Article } from "@/lib/types"
import { mockDeveloperProfile } from "@/lib/data"
import { saveArticles } from "./actions"

export default function ManageArticlesPage() {
  const [articles, setArticles] = useState<Article[]>(mockDeveloperProfile.articles || [])
  const [currentArticle, setCurrentArticle] = useState<Partial<Article>>({
    title: "",
    url: "",
    platform: "",
    publication: "",
    date: "",
    description: "",
  })

  const handleInputChange = (field: keyof Article, value: string) => {
    setCurrentArticle((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddArticle = () => {
    if (!currentArticle.title?.trim() || !currentArticle.url?.trim()) return

    const newArticle: Article = {
      id: `article-${Date.now()}`,
      ...currentArticle,
      title: currentArticle.title!,
      url: currentArticle.url!,
      platform: currentArticle.platform || "Blog",
      date: currentArticle.date!,
    }
    const updatedList = [...articles, newArticle]
    setArticles(updatedList)
    setCurrentArticle({ title: "", url: "", platform: "", publishDate: "" })
    void saveArticles({ articles: updatedList })
  }

  const handleRemoveArticle = (articleId: string) => {
    const updatedList = articles.filter((art) => art.id !== articleId)
    setArticles(updatedList)
    void saveArticles({ articles: updatedList })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="article-title">Title</Label>
            <Input
              id="article-title"
              value={currentArticle.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="article-url">URL</Label>
            <Input
              id="article-url"
              type="url"
              value={currentArticle.url}
              onChange={(e) => handleInputChange("url", e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="article-platform">Platform (e.g., Medium, Dev.to)</Label>
              <Input
                id="article-platform"
                value={currentArticle.platform}
                onChange={(e) => handleInputChange("platform", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="article-date">Date (Optional)</Label>
              <Input
                id="article-date"
                type="text"
                placeholder="e.g., Mar 2023"
                value={currentArticle.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
              />
            </div>
          </div>
          <Button onClick={handleAddArticle} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <PlusCircle className="mr-2 h-4 w-4" /> Add Article
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Articles</CardTitle>
        </CardHeader>
        <CardContent>
          {articles.length === 0 ? (
            <p className="text-muted-foreground">No articles added yet.</p>
          ) : (
            <ul className="space-y-3">
              {articles.map((art) => (
                <li key={art.id} className="p-3 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <a
                        href={art.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold hover:underline"
                      >
                        {art.title}
                      </a>
                      <p className="text-sm text-muted-foreground">
                        {art.platform} {art.date && `(${art.date})`}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveArticle(art.id)}
                      aria-label="Remove article"
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
