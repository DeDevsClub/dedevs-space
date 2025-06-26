"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, Brain, Code } from "lucide-react" // Added Brain, Code
import type { Skill } from "@/lib/types"
import { mockDeveloperProfile } from "@/lib/data" // For initial list
import { saveSkills } from "./actions"

export default function ManageSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>(mockDeveloperProfile.skills || [])
  const [newSkillName, setNewSkillName] = useState("")
  const [newSkillLevel, setNewSkillLevel] = useState<Skill["level"]>("Intermediate")
  // For simplicity, icon selection could be a text input for icon name or a more complex picker
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: newSkillName.trim(),
      level: newSkillLevel,
      category: "General",
      proficiency: "Beginner",
      icon: Code,
    }
    setSkills([...skills, newSkill])
    setNewSkillName("")
    // Potentially save immediately or wait for a main "Save All Skills" button
    void saveSkills({ skills: [...skills, newSkill] }) // Example: save on add
  }

  const handleRemoveSkill = (skillId: string) => {
    const updatedSkills = skills.filter((s) => s.id !== skillId)
    setSkills(updatedSkills)
    void saveSkills({ skills: updatedSkills }) // Example: save on remove
  }

  // Edit functionality would be more complex, involving setting editingSkill and updating it.
  // For this iteration, we'll focus on add/remove.

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Manage Your Skills</CardTitle>
          <CardDescription>Add, edit, or remove skills to showcase your expertise.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2 items-end p-4 border rounded-lg">
            <div className="flex-grow">
              <Label htmlFor="new-skill-name">Skill Name</Label>
              <Input
                id="new-skill-name"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                placeholder="e.g., Solidity, TensorFlow"
              />
            </div>
            <div className="w-full sm:w-auto">
              <Label htmlFor="new-skill-level">Proficiency Level</Label>
              <Select value={newSkillLevel} 
                onValueChange={(value: string) => setNewSkillLevel(value as Skill["level"]) as Skill["level"]}
                >
                <SelectTrigger id="new-skill-level">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {/* Icon selection could be added here */}
            <Button
              onClick={handleAddSkill}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> Add Skill
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Skills</CardTitle>
        </CardHeader>
        <CardContent>
          {skills.length === 0 ? (
            <p className="text-muted-foreground">No skills added yet.</p>
          ) : (
            <ul className="space-y-3">
              {skills.map((skill) => {
                const IconComponent =
                  skill.name.toLowerCase().includes("solidity") || skill.name.toLowerCase().includes("ethereum")
                    ? Code
                    : Brain // Simple icon logic
                return (
                  <li
                    key={skill.id}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <span className="font-medium">{skill.name}</span>
                      {skill.level && <span className="text-sm text-muted-foreground">({skill.level})</span>}
                    </div>
                    <div className="space-x-2">
                      {/* <Button variant="ghost" size="icon" onClick={() => setEditingSkill(skill)} aria-label="Edit skill">
                      <Edit3 className="h-4 w-4" />
                    </Button> */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSkill(skill.id)}
                        aria-label="Remove skill"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </li>
                )
              })}
            </ul>
          )}
        </CardContent>
      </Card>
      {/* A main "Save All Changes" button could be added if not saving on each action */}
    </div>
  )
}
