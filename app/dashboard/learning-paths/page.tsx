import LearningPathsDiscovery from "@/components/learning-paths/learning-paths-discovery"

export default function LearningPathsPage() {
  // Mock user progress data
  const mockUserProgress = [
    {
      pathId: "blockchain-developer",
      enrolledAt: new Date("2024-01-01"),
      overallProgress: 65,
      completedCourses: ["blockchain-fundamentals"],
      currentCourse: "solidity-basics",
    },
  ]

  // const handleEnroll = (pathId: string) => {
  //   console.log("Enrolling in path:", pathId)
  //   // In real app, this would call an API to enroll the user
  // }

  // const handleContinue = (pathId: string) => {
  //   console.log("Continuing path:", pathId)
  //   // In real app, this would navigate to the current course
  // }

  return <LearningPathsDiscovery userProgress={mockUserProgress} 
    // onEnroll={handleEnroll} 
    // onContinue={handleContinue}
     />
}
