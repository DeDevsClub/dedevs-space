import type { Project } from "@/lib/types"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, Star, GitFork } from "lucide-react"

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (!projects || projects.length === 0) return null

  // For now, we use mock projects. In a real app, this would fetch from GitHub API.
  // const { data: githubProjects, error } = useSWR('/api/github/alex-dev', fetcher);

  return (
    <section className="py-12 md:py-16 projects-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Featured Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="flex flex-col hover:shadow-xl transition-shadow">
              {project.imageUrl && (
                <div className="relative w-full h-48">
                  <Image
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl font-semibold">{project.name}</CardTitle>
                <CardDescription className="text-sm h-20 overflow-hidden text-ellipsis">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                {project.topics && project.topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.topics.slice(0, 4).map(
                      (
                        topic, // Show max 4 topics
                      ) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ),
                    )}
                  </div>
                )}
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {project.language && <span>{project.language}</span>}
                  {typeof project.stargazers_count === "number" && (
                    <span className="flex items-center">
                      <Star className="mr-1 h-4 w-4" /> {project.stargazers_count}
                    </span>
                  )}
                  {typeof project.forks_count === "number" && (
                    <span className="flex items-center">
                      <GitFork className="mr-1 h-4 w-4" /> {project.forks_count}
                    </span>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  asChild
                  variant="outline"
                  className="w-full bg-background hover:bg-accent text-accent-foreground border-primary"
                >
                  <a href={project.html_url} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" /> View on GitHub
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-center mt-8 text-muted-foreground">More projects available on my GitHub profile.</p>
      </div>
    </section>
  )
}
