import type { Article } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, ExternalLink } from "lucide-react"

interface ArticlesSectionProps {
  articles: Article[]
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  if (!articles || articles.length === 0) return null

  return (
    <section className="py-12 md:py-16 bg-muted/40 dark:bg-muted/20 articles-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">My Articles</h2>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center mb-2">
                  <FileText className="h-6 w-6 text-primary mr-3" />
                  <CardTitle className="text-xl font-semibold">{article.title}</CardTitle>
                </div>
                <CardDescription>
                  Published on {article.platform} {article.publishDate && `(${article.publishDate})`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="link" className="px-0 text-primary">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read Article <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
