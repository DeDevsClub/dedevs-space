export default function LoadingDeveloperProfile() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-muted rounded-full mb-6 mx-auto"></div>
        <div className="h-8 bg-muted rounded w-64 mb-3 mx-auto"></div>
        <div className="h-6 bg-muted rounded w-80 mb-4 mx-auto"></div>
        <div className="space-y-3 w-full max-w-md mx-auto">
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
        </div>
      </div>
      <p className="mt-8 text-lg font-semibold">Loading Developer Profile...</p>
      <div className="mt-4 w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
    </div>
  )
}
