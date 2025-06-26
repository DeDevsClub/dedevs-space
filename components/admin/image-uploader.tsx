"use client"

import { useState, type ChangeEvent, type DragEvent } from "react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { UploadCloud, XCircle, CheckCircle2 } from "lucide-react"

interface ImageUploaderProps {
  onUploadComplete: (url: string) => void
  initialImageUrl?: string | null
  label?: string
  aspectRatio?: "square" | "video" // For styling the dropzone
}

export default function ImageUploader({
  onUploadComplete,
  initialImageUrl,
  label = "Upload Image",
  aspectRatio = "square",
}: ImageUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(initialImageUrl || null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setSuccess(null)
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      // Basic validation (can be expanded)
      if (selectedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File is too large. Maximum size is 5MB.")
        return
      }
      if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(selectedFile.type)) {
        setError("Invalid file type. Please upload a JPG, PNG, GIF, or WEBP image.")
        return
      }
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }
  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }
  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    // You can add custom styling for drag over if needed
  }
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
    setError(null)
    setSuccess(null)

    const droppedFile = e.dataTransfer.files?.[0]
    if (droppedFile) {
      if (droppedFile.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("File is too large. Maximum size is 5MB.")
        return
      }
      if (!["image/jpeg", "image/png", "image/gif", "image/webp"].includes(droppedFile.type)) {
        setError("Invalid file type. Please upload a JPG, PNG, GIF, or WEBP image.")
        return
      }
      setFile(droppedFile)
      setPreview(URL.createObjectURL(droppedFile))
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.")
      return
    }

    setIsUploading(true)
    setError(null)
    setSuccess(null)
    setUploadProgress(0)

    // Simulate upload process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setUploadProgress(i)
    }

    // In a real app, you'd use fetch to send the file to a server action or API route
    // e.g., const formData = new FormData(); formData.append('file', file);
    // const response = await fetch('/api/upload', { method: 'POST', body: formData });
    // const data = await response.json();
    // if (response.ok) {
    //   onUploadComplete(data.url);
    //   setSuccess("Image uploaded successfully!");
    // } else {
    //   setError(data.error || "Upload failed.");
    // }

    // Simulated success
    const mockUrl = `/placeholder.svg?width=200&height=200&query=uploaded+${encodeURIComponent(file.name)}`
    onUploadComplete(mockUrl)
    setSuccess(`Image "${file.name}" uploaded successfully (simulated). URL: ${mockUrl}`)
    setFile(null) // Clear file after successful upload
    setIsUploading(false)
  }

  const dropzoneAspectRatioClass = aspectRatio === "video" ? "aspect-video" : "aspect-square"

  return (
    <div className="space-y-4">
      <Label htmlFor="image-upload" className="text-base font-medium">
        {label}
      </Label>
      <div
        className={`flex flex-col items-center justify-center w-full p-6 border-2 border-dashed rounded-lg cursor-pointer
                    ${isDragging ? "border-primary bg-primary/10" : "border-muted-foreground/30 hover:border-muted-foreground/50"}
                    ${dropzoneAspectRatioClass}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => document.getElementById("image-upload-input")?.click()}
      >
        <UploadCloud className={`w-12 h-12 mb-3 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
        <p className={`mb-2 text-sm ${isDragging ? "text-primary" : "text-muted-foreground"}`}>
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className={`text-xs ${isDragging ? "text-primary" : "text-muted-foreground"}`}>
          SVG, PNG, JPG, GIF or WEBP (MAX. 5MB)
        </p>
        <Input
          id="image-upload-input"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/gif,image/webp"
        />
      </div>

      {preview && (
        <div className="mt-4 text-center">
          <p className="text-sm font-medium mb-2">Image Preview:</p>
          <Image
            src={preview || "/placeholder.svg"}
            alt="Image preview"
            width={aspectRatio === "video" ? 320 : 200}
            height={aspectRatio === "video" ? 180 : 200}
            className="rounded-md object-cover mx-auto border"
          />
        </div>
      )}

      {file && !isUploading && (
        <Button onClick={handleUpload} className="w-full mt-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          Upload {file.name}
        </Button>
      )}

      {isUploading && (
        <div className="mt-2">
          <Progress value={uploadProgress} className="w-full" />
          <p className="text-sm text-center text-muted-foreground mt-1">Uploading: {uploadProgress}%</p>
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <XCircle className="h-4 w-4" />
          <AlertTitle>Upload Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert
          variant="default"
          className="mt-4 bg-green-50 border-green-300 text-green-700 dark:bg-green-900/30 dark:border-green-700 dark:text-green-400"
        >
          <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />
          <AlertTitle>Upload Successful</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
