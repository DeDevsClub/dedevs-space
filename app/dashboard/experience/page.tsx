"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import type { ExperienceItem } from "@/lib/types"
import { mockDeveloperProfile } from "@/lib/data"
import { saveExperience } from "./actions"

export default function ManageExperiencePage() {
  const [experienceList, setExperienceList] = useState<ExperienceItem[]>(mockDeveloperProfile.experience || [])
  const [currentExperience, setCurrentExperience] = useState<Partial<ExperienceItem>>({
    title: "",
    company: "",
    startDate: "",
    endDate: "",
    description: "",
    technologies: [],
  })
  const [techInput, setTechInput] = useState("")

  const handleInputChange = (field: keyof ExperienceItem, value: string) => {
    setCurrentExperience((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddTechnology = () => {
    if (techInput.trim() && !currentExperience.technologies?.includes(techInput.trim())) {
      setCurrentExperience((prev) => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()],
      }))
      setTechInput("")
    }
  }

  const handleRemoveTechnology = (techToRemove: string) => {
    setCurrentExperience((prev) => ({
      ...prev,
      technologies: prev.technologies?.filter((tech) => tech !== techToRemove),
    }))
  }

  const handleAddExperience = () => {
    if (!currentExperience.title?.trim() || !currentExperience.company?.trim()) return

    const newExperience: ExperienceItem = {
      id: `exp-${Date.now()}`,
      ...currentExperience,
      title: currentExperience.title!, // Asserting as they are checked
      company: currentExperience.company!,
      description: currentExperience.description || "",
      startDate: currentExperience.startDate || "",
    }
    const updatedList = [...experienceList, newExperience]
    setExperienceList(updatedList)
    setCurrentExperience({ title: "", company: "", startDate: "", endDate: "", description: "", technologies: [] }) // Reset form
    void saveExperience({ experience: updatedList })
  }

  const handleRemoveExperience = (expId: string) => {
    const updatedList = experienceList.filter((exp) => exp.id !== expId)
    setExperienceList(updatedList)
    void saveExperience({ experience: updatedList })
  }

  return (
    <div className="relative flex flex-col min-h-screen w-full bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] dark:from-[#0f172a] dark:via-[#181c2a] dark:to-[#1e293b] px-4 py-6 sm:px-6 md:px-8 overflow-x-hidden">
      {/* AI/Blockchain Themed Background Shapes */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-48 bg-gradient-to-r from-blue-400/10 via-cyan-300/5 to-purple-400/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-12 right-0 w-72 h-32 bg-gradient-to-tr from-purple-500/10 to-blue-400/5 rounded-full blur-2xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-400/10 to-blue-500/5 rounded-full blur-2xl opacity-30" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent">
        Developer Experience
      </h1>
      
      <Card className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 shadow-xl backdrop-blur-sm border border-blue-200/50 dark:border-blue-900/30 rounded-xl mb-8 z-10">
      <CardHeader className="border-b border-blue-100 dark:border-blue-900/30">
        <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">Add New Experience</CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-400">Detail your professional roles and responsibilities in AI and blockchain.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 py-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="exp-title" className="text-sm font-medium text-gray-700 dark:text-gray-300">Job Title *</Label>
              <Input
                id="exp-title"
                value={currentExperience.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="AI Engineer, Blockchain Developer"
                className="border-blue-200 dark:border-blue-900/40 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
                aria-required="true"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="exp-company" className="text-sm font-medium text-gray-700 dark:text-gray-300">Company/Organization *</Label>
              <Input
                id="exp-company"
                value={currentExperience.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                placeholder="OpenAI, ChainLabs, DeDevs"
                className="border-blue-200 dark:border-blue-900/40 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
                aria-required="true"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="exp-startDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">Start Date *</Label>
              <Input
                id="exp-startDate"
                type="month"
                value={currentExperience.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="border-blue-200 dark:border-blue-900/40 focus:ring-blue-500 dark:focus:ring-blue-400"
                required
                aria-required="true"
              />
              <p className="text-xs text-muted-foreground mt-1">Format: YYYY-MM</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="exp-endDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">End Date</Label>
                <span className="text-xs text-muted-foreground">(Leave blank if current)</span>
              </div>
              <Input
                id="exp-endDate"
                type="month"
                value={currentExperience.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="border-blue-200 dark:border-blue-900/40 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="exp-description" className="text-sm font-medium text-gray-700 dark:text-gray-300">Description</Label>
            <Textarea
              id="exp-description"
              rows={4}
              value={currentExperience.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Describe your responsibilities, achievements, and technologies used..."
              className="border-blue-200 dark:border-blue-900/40 focus:ring-blue-500 dark:focus:ring-blue-400 resize-y min-h-[100px]"
            />
          </div>
          
          <div className="space-y-3 bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-lg border border-blue-100 dark:border-blue-900/20">
            <Label htmlFor="exp-tech-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">Technologies Used</Label>
            <div className="flex gap-2">
              <Input
                id="exp-tech-input"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if ((e.key === 'Enter' || e.key === ',') && techInput.trim()) {
                    e.preventDefault();
                    handleAddTechnology();
                  }
                }}
                placeholder="React, TypeScript, Web3.js"
                className="flex-1 border-blue-200 dark:border-blue-900/40 focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleAddTechnology} 
                className="bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300"
              >
                <PlusCircle className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Press Enter or comma to add multiple quickly</p>
            
            {currentExperience.technologies && currentExperience.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 p-2 bg-white/80 dark:bg-gray-800/80 rounded border border-blue-100 dark:border-blue-900/20 min-h-[40px]">
                {currentExperience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-gradient-to-r from-blue-600/90 to-purple-600/90 text-white rounded-full shadow-sm"
                  >
                    {tech}
                    <button
                      type="button"
                      aria-label={`Remove ${tech}`}
                      className="ml-1.5 rounded-full hover:bg-white/20 focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 p-0.5 transition-colors"
                      onClick={() => handleRemoveTechnology(tech)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="pt-2 flex justify-end">
            <Button 
              onClick={handleAddExperience} 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 h-auto shadow-md hover:shadow-lg transition-all"
              disabled={!currentExperience.title || !currentExperience.company || !currentExperience.startDate}
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Add Experience
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-[calc(100%-8rem)] shadow-lg rounded-lg border-2 border-primary shadow-blue-500 radius-xl">
        <CardHeader>
          <CardTitle>Current Experience</CardTitle>
        </CardHeader>
        <CardContent>
          {experienceList.length === 0 ? (
            <p className="text-muted-foreground">No experience added yet.</p>
          ) : (
            <ul className="space-y-4">
              {experienceList.map((exp) => (
                <li key={exp.id} className="p-4 border rounded-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold">
                        {exp.title} at {exp.company}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveExperience(exp.id)}
                      aria-label="Remove experience"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                  <p className="text-sm mt-2">{exp.description}</p>
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {exp.technologies.map((tech) => (
                        <span key={tech} className="px-1.5 py-0.5 text-xs bg-muted text-muted-foreground rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
