'use client'

import { useState, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Github, Star, Plus } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { keyframes } from '@emotion/react';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(232, 88, 57, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(232, 88, 57, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(232, 88, 57, 0);
  }
`;

type Project = {
  id: string
  name: string
  description: string
  githubUrl: string
  stars: number
  imageUrl: string
  category: 'DSA' | 'ML' | 'Other'
}

const projects: Project[] = [
  { 
    id: "1",
    name: "E-commerce Platform", 
    description: "A full-stack e-commerce solution with advanced features for online retail businesses.", 
    githubUrl: "https://github.com/username/e-commerce",
    stars: 120,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Other"
  },
  { 
    id: "2",
    name: "Task Manager", 
    description: "A React-based task management app with real-time updates and team collaboration features.", 
    githubUrl: "https://github.com/username/task-manager",
    stars: 85,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "Other"
  },
  { 
    id: "3",
    name: "Weather App", 
    description: "Real-time weather forecasting application with interactive maps and severe weather alerts.", 
    githubUrl: "https://github.com/username/weather-app",
    stars: 56,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "ML"
  },
  { 
    id: "4",
    name: "Sorting Visualizer", 
    description: "Interactive visualization of various sorting algorithms.", 
    githubUrl: "https://github.com/username/sorting-visualizer",
    stars: 72,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "DSA"
  },
  { 
    id: "5",
    name: "Image Classification Model", 
    description: "A machine learning model for image classification using TensorFlow.", 
    githubUrl: "https://github.com/username/image-classification",
    stars: 98,
    imageUrl: "/placeholder.svg?height=400&width=600",
    category: "ML"
  },
]

export default function ProjectShowcase() {
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<'DSA' | 'ML' | null>(null)

  const filteredProjects = selectedCategory
  ? projects.filter(project => project.category === selectedCategory)
  : projects

  const selectedProject = filteredProjects.find(project => project.id === selectedProjectId) || null
  const selectedProjectIndex = selectedProject ? filteredProjects.findIndex(project => project.id === selectedProject.id) : -1

  const handlePrevProject = useCallback(() => {
    const prevIndex = selectedProjectIndex > 0 ? selectedProjectIndex - 1 : filteredProjects.length - 1
    setSelectedProjectId(filteredProjects[prevIndex].id)
  }, [selectedProjectIndex, filteredProjects])

  const handleNextProject = useCallback(() => {
    const nextIndex = selectedProjectIndex < filteredProjects.length - 1 ? selectedProjectIndex + 1 : 0
    setSelectedProjectId(filteredProjects[nextIndex].id)
  }, [selectedProjectIndex, filteredProjects])

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      handlePrevProject()
    } else if (e.key === 'ArrowRight') {
      handleNextProject()
    }
  }, [handlePrevProject, handleNextProject])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown])

  return (
    <div className="min-h-screen pl-[5%] bg-[#0d0d0d] text-[#afa18f]">
        <Link href="/">
      <Button
        variant="ghost"
        className="fixed top-4 left-4 z-20 text-[#afa18f] hover:text-[#e85839] transition-all duration-300 ease-in-out rounded-full p-2"
        onClick={() => {
          setSelectedProjectId(null);
          setSelectedCategory(null);
        }}
        aria-label="Back to all projects"
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      </Link>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-[#1a1a1a] rounded-full p-1 shadow-lg transition-all duration-300 ease-in-out hover:shadow-[#e85839]/20 hover:shadow-lg">
          <nav className="flex space-x-1">
            {['All Projects', 'DSA', 'LIVE', 'ML'].map((item) => (
              <Button
                key={item}
                variant="ghost"
                className={`text-[#afa18f] transition-all duration-300 ease-in-out rounded-full px-4 py-2 ${
                  (item === 'All Projects' && !selectedCategory) || selectedCategory === item
                    ? 'bg-[#e85839]/20 text-[#e85839]'
                    : 'hover:text-[#e85839] hover:bg-[#e85839]/10'
                }`}
                onClick={() => setSelectedCategory(item === 'All Projects' ? null : item as 'DSA' | 'ML')}
              >
                <span className="relative">
                  {item}
                  <span className={`absolute inset-x-0 bottom-0 h-0.5 bg-[#e85839] transform transition-transform duration-300 ease-in-out ${
                    (item === 'All Projects' && !selectedCategory) || selectedCategory === item
                      ? 'scale-x-100'
                      : 'scale-x-0 group-hover:scale-x-100'
                  }`} />
                </span>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      <main className="container grid grid-cols-1 md:grid-cols-[300px,1fr] gap-8 p-4 pt-28">
        <aside>
          <ScrollArea className="h-[calc(100vh-5rem)]">
            <nav className="space-y-2 pr-4" aria-label="Projects navigation">
              <h2 className="mb-4 text-lg font-semibold">My Projects</h2>
              {filteredProjects.map((project) => (
                <Button
                  key={project.id}
                  variant="ghost"
                  className={`w-full justify-between text-[#afa18f] hover:bg-[#e85839]/10 transition-colors ${
                    selectedProjectId === project.id ? 'bg-[#e85839]/20' : ''
                  }`}
                  onClick={() => setSelectedProjectId(project.id)}
                  aria-current={selectedProjectId === project.id ? 'page' : undefined}
                >
                  <span>{project.name}</span>
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Button>
              ))}
            </nav>
          </ScrollArea>
        </aside>

        <section className="flex items-center justify-center relative" aria-live="polite">
          {selectedProject ? (
            <>
              <Button
                variant="ghost"
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#afa18f] hover:text-[#e85839]"
                onClick={handlePrevProject}
                aria-label="Previous project"
              >
                <ChevronLeft className="h-8 w-8" />
              </Button>
              <Card className="w-full max-w-2xl bg-[#0d0d0d] text-[#afa18f] border-[#e85839]">
                <CardHeader className="flex flex-row items-center justify-between">
                  <h2 className="text-2xl font-bold">{selectedProject.name}</h2>
                  <div className="flex items-center gap-2" aria-label={`${selectedProject.stars} stars`}>
                    <Star className="h-5 w-5 text-[#e85839]" aria-hidden="true" />
                    <span>{selectedProject.stars}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{selectedProject.description}</p>
                  <Image
                    src={selectedProject.imageUrl}
                    alt={`Screenshot of ${selectedProject.name}`}
                    width={600}
                    height={400}
                    className="rounded-lg object-cover w-full"
                  />
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-[#e85839] hover:bg-[#e85839]/90 text-[#0d0d0d]">
                    <Link href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" aria-hidden="true" />
                      View on GitHub
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
              <Button
                variant="ghost"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#afa18f] hover:text-[#e85839]"
                onClick={handleNextProject}
                aria-label="Next project"
              >
                <ChevronRight className="h-8 w-8" />
              </Button>
            </>
          ) : (
            <div className="flex min-h-[500px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-[#e85839]/20 p-8 text-center">
              <div className="h-16 w-16 rounded bg-[#e85839]/20 p-4" aria-hidden="true">
                <div className="h-full w-full bg-[#e85839]" />
              </div>
              <p className="text-lg">Select a project from the left menu to view details.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}