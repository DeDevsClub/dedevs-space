import type { Skill } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain } from "lucide-react" // Default icon

interface SkillsSectionProps {
  skills: Skill[]
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  if (!skills || skills.length === 0) return null

  return (
    <section className="py-12 md:py-16 skills-section">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-foreground">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {skills.map((skill) => {
            const IconComponent = skill.icon || Brain
            return (
              <Card key={skill.id} className="text-center hover:shadow-lg transition-shadow skill-card">
                <CardHeader className="pb-2">
                  <IconComponent className="mx-auto h-10 w-10 text-primary mb-2" />
                  <CardTitle className="text-lg font-semibold">{skill.name}</CardTitle>
                </CardHeader>
                <CardContent>{skill.level && <Badge variant="secondary">{skill.level}</Badge>}</CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
