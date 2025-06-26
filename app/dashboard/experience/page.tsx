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
    <div className="relative flex flex-col min-h-screen w-full justify-center items-center bg-gradient-to-tr from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] dark:from-[#0f172a] dark:via-[#181c2a] dark:to-[#1e293b] px-4 py-6 sm:px-6 md:px-8 overflow-x-hidden">
      {/* AI/Blockchain Themed Background Shapes */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-48 bg-neutral-400/10 rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-12 right-0 w-72 h-32 bg-neutral-400/5 rounded-full blur-2xl opacity-40" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-neutral-400/5 rounded-full blur-2xl opacity-30" />
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-neutral-600 bg-clip-text text-transparent">
        Developer Experience
      </h1>
      
      <Card className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 shadow-xl backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-900/30 rounded-xl mb-8 z-10">
      <CardHeader className="border-b border-neutral-100 dark:border-neutral-900/30">
        <CardTitle className="text-2xl text-neutral-700 dark:text-neutral-300">Add New Experience</CardTitle>
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
                className="border-neutral-200 dark:border-neutral-900/40 focus:ring-neutral-500 dark:focus:ring-neutral-400"
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
                className="border-neutral-200 dark:border-neutral-900/40 focus:ring-neutral-500 dark:focus:ring-neutral-400"
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
                className="border-neutral-200 dark:border-neutral-900/40 focus:ring-neutral-500 dark:focus:ring-neutral-400"
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
                className="border-neutral-200 dark:border-neutral-900/40 focus:ring-neutral-500 dark:focus:ring-neutral-400"
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
              className="border-neutral-200 dark:border-neutral-900/40 focus:ring-neutral-500 dark:focus:ring-neutral-400 resize-y min-h-[100px]"
            />
          </div>
          
          <div className="space-y-3 bg-neutral-50/50 dark:bg-neutral-900/10 p-4 rounded-lg border border-neutral-100 dark:border-neutral-900/20">
            <Label htmlFor="exp-tech-input" className="text-sm font-medium text-gray-700 dark:text-gray-300">Tech Stack</Label>
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
                className="flex-1 border-neutral-200 dark:border-neutral-900/40 focus:ring-neutral-500 dark:focus:ring-neutral-400"
              />
              <Button 
                type="button" 
                variant="secondary" 
                onClick={handleAddTechnology} 
                className="bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-900/30 dark:hover:bg-neutral-900/50 text-neutral-700 dark:text-neutral-300"
              >
                <PlusCircle className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Press Enter or comma to add multiple quickly</p>
            
            {currentExperience.technologies && currentExperience.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3 p-2 bg-white/80 dark:bg-gray-800/80 rounded border border-neutral-100 dark:border-neutral-900/20 min-h-[40px]">
                {currentExperience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="flex items-center gap-1 px-2.5 py-1.5 text-xs bg-neutral-600/90 text-white rounded-full shadow-sm"
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
              className="bg-neutral-700 text-white font-medium px-6 py-2 h-auto shadow-md hover:shadow-lg transition-all"
              disabled={!currentExperience.title || !currentExperience.company || !currentExperience.startDate}
            >
              <PlusCircle className="mr-2 h-5 w-5" /> Add Experience
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 shadow-xl backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-900/30 rounded-xl mb-6 z-10">
        <CardHeader className="border-b border-neutral-100 dark:border-neutral-900/30">
          <CardTitle className="text-2xl text-neutral-700 dark:text-neutral-300">Experience Timeline</CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">Your professional journey in blockchain and AI development.</CardDescription>
        </CardHeader>
        <CardContent className="py-8">
          {experienceList.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center p-8 bg-neutral-50/50 dark:bg-neutral-900/10 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-900/30">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-neutral-400 dark:text-neutral-500 mb-3">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M12 8V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-muted-foreground font-medium">No experience added yet</p>
              <p className="text-sm text-muted-foreground mt-1">Add your first experience using the form above</p>
            </div>
          ) : (
            <div className="relative">
              {/* Timeline track */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-neutral-400 transform md:-translate-x-1/2" aria-hidden="true" />
              
              <ul className="space-y-12">
                {experienceList.map((exp, i) => (
                  <li key={exp.id} className="relative">
                    <div className={`flex flex-col md:flex-row gap-6 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                      {/* Timeline node */}
                      <div className="absolute left-0 md:left-1/2 top-0 transform -translate-x-1/2 md:-translate-x-1/2">
                        <div className="w-5 h-5 rounded-full bg-neutral-600 border-2 border-white dark:border-gray-900 shadow-md" />
                      </div>
                      
                      {/* Content card */}
                      <div className={`pl-8 md:pl-0 ${i % 2 === 0 ? 'md:pr-12 md:w-1/2' : 'md:pl-12 md:w-1/2 md:ml-auto'}`}>
                        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg border border-neutral-100 dark:border-neutral-900/30 p-5 hover:shadow-lg transition-shadow">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <h4 className="text-lg font-bold text-neutral-700 dark:text-neutral-300">
                                {exp.title}
                              </h4>
                              <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                                {exp.company}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-mono bg-neutral-50 dark:bg-neutral-900/30 text-neutral-600 dark:text-neutral-300 px-2.5 py-1 rounded whitespace-nowrap">
                                {exp.startDate} – {exp.endDate || "Present"}
                              </span>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveExperience(exp.id)}
                                aria-label="Remove experience"
                                className="h-8 w-8 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-500 dark:hover:text-red-400"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-300 my-3 whitespace-pre-wrap">{exp.description}</p>
                          
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {exp.technologies.map((tech) => (
                                <span 
                                  key={tech} 
                                  className="px-2.5 py-1 text-xs font-medium bg-neutral-600/90 text-white rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
