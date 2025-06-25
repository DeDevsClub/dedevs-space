import type { ExperienceItem } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ExperienceSectionProps {
  experience: ExperienceItem[]
}

export default function ExperienceSection({ experience }: ExperienceSectionProps) {
  if (!experience || experience.length === 0) return null

  return (
    <section className="py-12 md:py-16 bg-muted/40 dark:bg-muted/20 experience-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">Work Experience</h2>
        <div className="relative pl-6 after:absolute after:inset-y-0 after:w-0.5 after:bg-primary/20 after:left-0">
          {experience.map((item, index) => (
            <div key={item.id} className={`relative mb-8 pl-8 ${index === experience.length - 1 ? "" : "pb-8"}`}>
              <div className="absolute left-[-22px] top-1 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Briefcase className="h-5 w-5" />
              </div>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
                  <CardDescription className="text-md">
                    {item.company} | {item.startDate} - {item.endDate || "Present"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{item.description}</p>
                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.technologies.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
