'use client'

import React, { useState, useEffect } from 'react'
import { MapPin, ChevronRight, File, Folder, Github, Star, Tag, User, Code, Mail, Linkedin, GitBranch, Menu, Instagram } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RiHome2Line } from "react-icons/ri";

type Project = {
  name: string
  description: string
  githubUrl: string
  stars: number
  imageUrl: string
  category: string
  tags: string[]
}

type View = 'home' | 'about' | 'projects'
type AboutPage = 'profile' | 'Other' | 'contact'

export default function Component() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("All Projects")
  const [currentView, setCurrentView] = useState<View>('projects')
  const [currentAboutPage, setCurrentAboutPage] = useState<AboutPage>('profile')
  const [currentTime, setCurrentTime] = useState<string>('')
  const [isExplorerOpen, setIsExplorerOpen] = useState(false)

  const projects: Project[] = [
    {
      name: "Neural Network Classifier",
      description: "A deep learning model for image classification",
      githubUrl: "https://github.com/username/neural-network-classifier",
      stars: 120,
      imageUrl: "/placeholder.svg?height=100&width=200",
      category: "Machine Learning",
      tags: ["Python", "TensorFlow", "Deep Learning", "Computer Vision"],
    },
    {
      name: "Graph Algorithms Visualizer",
      description: "Interactive tool for visualizing graph algorithms",
      githubUrl: "https://github.com/username/graph-algorithms-visualizer",
      stars: 85,
      imageUrl: "/placeholder.svg?height=100&width=200",
      category: "Data Structures & Algorithms",
      tags: ["JavaScript", "D3.js", "Algorithms", "Visualization"],
    },
    {
      name: "Sentiment Analysis API",
      description: "RESTful API for sentiment analysis of text",
      githubUrl: "https://github.com/username/sentiment-analysis-api",
      stars: 56,
      imageUrl: "/placeholder.svg?height=100&width=200",
      category: "Machine Learning",
      tags: ["Python", "Flask", "NLP", "API"],
    },
    {
      name: "Sorting Algorithms Benchmark",
      description: "Performance comparison of various sorting algorithms",
      githubUrl: "https://github.com/username/sorting-algorithms-benchmark",
      stars: 32,
      imageUrl: "/placeholder.svg?height=100&width=200",
      category: "Data Structures & Algorithms",
      tags: ["C++", "Algorithms", "Benchmarking", "Data Structures"],
    },
    {
      name: "Responsive Portfolio",
      description: "A responsive personal portfolio website",
      githubUrl: "https://github.com/username/responsive-portfolio",
      stars: 98,
      imageUrl: "/placeholder.svg?height=100&width=200",
      category: "Web Development",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    },
  ]

  const categories = ["All Projects", "Machine Learning", "Data Structures & Algorithms", "Web Development"]
  const selectedProject = selectedProjectIndex !== null ? projects[selectedProjectIndex] : null

  const filteredProjects = selectedCategory === "All Projects"
    ? projects
    : projects.filter(p => p.category === selectedCategory)

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }
      setCurrentTime(now.toLocaleTimeString('en-US', options))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const toggleExplorer = () => {
    setIsExplorerOpen(!isExplorerOpen)
  }

  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#0d0d0d] text-[#afa18f] cursor-default">
      {/* VS Code-like header */}
      <header className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] text-[#afa18f]">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={toggleExplorer}
          >
            <Menu className="w-5 h-5" />
          </Button>
          <Folder className="w-5 h-5" />
          <span className="text-sm font-medium">Portfolio</span>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left icon bar */}
        <div className="w-12 bg-[#1a1a1a] flex flex-col items-center py-4 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className={`w-10 h-10 ${currentView === 'home' ? 'bg-[#2a2a2a] text-[#e85839]' : 'text-[#afa18f]'}`}
            onClick={() => setCurrentView('home')}
          >
            <Link href="../">
              <RiHome2Line className="w-6 h-6" />
            </Link>

          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-10 h-10 ${currentView === 'about' ? 'bg-[#2a2a2a] text-[#e85839]' : 'text-[#afa18f]'}`}
            onClick={() => setCurrentView('about')}
          >
            <User className="w-6 h-6" />
            <span className="sr-only">About Me</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-10 h-10 ${currentView === 'projects' ? 'bg-[#2a2a2a] text-[#e85839]' : 'text-[#afa18f]'}`}
            onClick={() => setCurrentView('projects')}
          >
            <Code className="w-6 h-6" />
            <span className="sr-only">Projects</span>
          </Button>
        </div>

        {/* Explorer sidebar */}
        <div className={`w-64 bg-[#141414] border-r border-[#2a2a2a] md:block ${isExplorerOpen ? 'block' : 'hidden'} absolute md:relative z-10 h-full`}>
          <ScrollArea className="h-full">
            <div className="p-2">
              <h2 className="px-2 py-1 text-xs uppercase text-[#7a7a7a]">Explorer</h2>
              {currentView === 'projects' ? (
                filteredProjects.map((project, index) => (
                  <Button
                    key={project.name}
                    variant="ghost"
                    size="sm"
                    className={`w-full justify-start text-left py-1 px-2 text-sm ${selectedProjectIndex === projects.indexOf(project) ? 'bg-[#2a2a2a] text-[#e85839]' : 'text-[#afa18f]'
                      }`}
                    onClick={() => {
                      setSelectedProjectIndex(projects.indexOf(project))
                      setIsExplorerOpen(false)
                    }}
                  >
                    <File className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">{project.name}</span>
                  </Button>
                ))
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left py-1 px-2 text-sm ${currentAboutPage === 'profile' ? 'bg-[#2a2a2a] text-[#e85839]' : 'text-[#afa18f]'
                      }`}
                    onClick={() => {
                      setCurrentAboutPage('profile')
                      setIsExplorerOpen(false)
                    }}
                  >
                    <ChevronRight className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">Profile</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left py-1 px-2 text-sm ${currentAboutPage === 'Other' ? 'bg-[#2a2a2a] text-[#e85839]' : 'text-[#afa18f]'
                      }`}
                    onClick={() => {
                      setCurrentAboutPage('Other')
                      setIsExplorerOpen(false)
                    }}
                  >
                    <ChevronRight className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">Other</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start text-left py-1 px-2 text-sm ${currentAboutPage === 'contact' ? 'bg-[#2a2a2a] text-[#e85839]' : 'text-[#afa18f]'
                      }`}
                    onClick={() => {
                      setCurrentAboutPage('contact')
                      setIsExplorerOpen(false)
                    }}
                  >
                    <ChevronRight className="w-4 h-4 mr-2 shrink-0" />
                    <span className="truncate">Contact</span>
                  </Button>
                </>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {currentView === 'projects' && (
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="bg-[#1a1a1a] justify-start h-9 p-0 overflow-x-auto flex-nowrap">
                {categories.map(category => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="px-3 h-full data-[state=active]:bg-[#0d0d0d] data-[state=active]:text-[#e85839] rounded-none whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          )}

          {/* Main canvas */}
          <ScrollArea className="flex-1 bg-[#0d0d0d]">
            <div className="p-4">
              {currentView === 'projects' ? (
                selectedProject ? (
                  <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                    <CardHeader>
                      <CardTitle className="text-2xl font-bold text-[#e85839]">{selectedProject.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span>{selectedProject.stars} stars</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-4 text-[#afa18f]">
                        <div>
                          <Image
                            src={selectedProject.imageUrl}
                            alt={`Screenshot of ${selectedProject.name}`}
                            width={200}
                            height={100}
                            className="rounded-lg object-cover w-full mb-4"
                          />
                          <p className="text-sm mb-4">{selectedProject.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {selectedProject.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="bg-[#2a2a2a] text-[#afa18f]">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs mb-4">Category: {selectedProject.category}</p>
                          <Button asChild className="w-full bg-[#333] hover:bg-[#555]  text-[#afa18f]"
                          size="iconsm"
                          >
                            <Link href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              View on GitHub
                            </Link>
                          </Button>
                        </div>
                        <div className="bg-[#0d0d0d] p-4 rounded-lg text-sm">
                          <h3 className="text-lg font-bold mb-2 text-[#e85839]">Project Details</h3>
                          <p className="mb-2">This section includes additional project information such as:</p>
                          <ul className="list-disc list-inside mb-4 text-xs">
                            <li>Project goals and objectives</li>
                            <li>Key features and functionalities</li>
                            <li>Technologies and tools used</li>
                            <li>Challenges faced and solutions implemented</li>
                            <li>Future improvements or roadmap</li>
                          </ul>
                          <p className="text-xs">For more detailed information and to view the source code, please visit the GitHub repository.</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="flex items-center justify-center h-full text-[#7a7a7a]">
                    Select a project to view details
                  </div>
                )
              ) : (
                <div className="max-w-4xl mx-auto">
                  {currentAboutPage === 'profile' && (
                    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <CardHeader>
                        <CardDescription>
                          <div className="flex items-center gap-4 bg-[#1a1a1a] rounded-md p-4">
                            <Image
                              src="/Sajaljha.jpg?height=200&width=200"
                              alt="Profile picture"
                              width={180}
                              height={180}
                              className="rounded-full border-[#e85839] border-2"
                            />
                            <div>
                              <h2 className="text-4xl font-bold text-[#e85839] cursor-default transition duration-500"

                              ></h2>
                              <div className={`text-center md:text-left transition-all duration-300 delay-200`}>

                                <p className="text-xl mb-3 mt-4 text-[#afa18f]">About Me</p>
                                <h1 className="text-5xl font-bold mb-4 text-[#e85839] tracking-tight"
                                  onMouseEnter={() => setIsHovered(true)}
                                  onMouseLeave={() => setIsHovered(false)}
                                > {isHovered ? 'S/O Sandeep Kumar Jha' : 'Sajal Jha'}</h1>
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
                                  <div className="flex items-center space-x-2">
                                    <Mail className="h-5 w-5 text-[#e85839]" />
                                    <span>Sajaljha.official@gmail.com</span>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <MapPin className="h-5 w-5 text-[#e85839]" />
                                    <span>Greater Noida, Up</span>
                                  </div>
                                </div>
                                <p className="max-w-lg text-[#afa18f] mb-6">
                                  I'm someone who tackles challenges head-on, adapts fast,
                                  and sees every obstacle as a chance to grow and push my limits.
                                </p>

                              </div>
                            </div>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>

                        {/* New Section: Who I Am */}
                        <div className="group"
                        >
                          <h3 className="text-lg font-bold mb-2 text-[#e85839] group-hover:text-[#e85839]">Who I Am</h3>
                          <p className="text-sm mb-4 text-[#afa18f] group-hover:text-[#afa18f]  transition-all duration-700 ${isHovered1 ? 'delay-700' : ''}"
                            onMouseEnter={() => setIsHovered2(true)}
                            onMouseLeave={() => setIsHovered2(false)}
                          >
                            {isHovered2 ? "I'm just a regular human who occasionally pretends to have it all figured out. Leadership? Sure. Learning fast? Sometimes it's more like Googling fast. But hey, it works!" : " I'm Sajal Jha, a passionate coder with a knack for leadership and a quick grasp of new ideas. I thrive on solving problems, learning rapidly, and inspiring teams to create impactful solutions."}
                          </p>
                        </div>

                        {/* New Section: My Approach */}
                        <div className="group">
                          <h3 className="text-lg font-bold mb-2 text-[#e85839] group-hover:text-[#e85839]">My Approach</h3>
                          <p className="text-sm mb-4 text-[#afa18f] group-hover:text-[#afa18f]"
                            onMouseEnter={() => setIsHovered3(true)}
                            onMouseLeave={() => setIsHovered3(false)}
                          >
                            {isHovered3 ? "I approach life and problems with grit, even when things get tough or feel impossible. The struggle is real, but I believe that every challenge is just another step toward growth, no matter how hard it may seem." : "I approach life like a complex problem—break it down, stay curious, adapt quickly, and find creative solutions. Challenges are just opportunities to grow and learn, and I tackle them with a mix of persistence, optimism, and a healthy dose of humor."}

                          </p>
                        </div>
                      </CardContent>
                    </Card>

                  )}
                  {currentAboutPage === 'Other' && (
                    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#e85839]">Other</CardTitle>
                      </CardHeader>
                      <CardContent>

                      </CardContent>
                    </Card>
                  )}
                  {currentAboutPage === 'contact' && (
                    <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
                      <CardHeader>
                        <CardTitle className="text-2xl font-bold text-[#e85839]">Contact</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4 text-[#afa18f]">
                          Feel free to reach out to me for collaborations, job opportunities, or just to say Hi!
                        </p>
                        <div className="flex flex-col space-y-4">
                          <Button asChild className="bg-[#D14836] hover:bg-[#b03a2b] text-white"
                            size="iconsm"
                          >
                            <Link href="mailto:Sajaljha.official@gmail.com">
                              <Mail className="mr-2 h-4 w-4" />
                              Sajaljha.official@gmail.com
                            </Link>
                          </Button>
                          <Button asChild className="bg-[#0077b5] hover:bg-[#005885] text-white"

                            size="iconsm"
                          >
                            <Link href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer">
                              <Linkedin className="mr-2 w-2 h-2" />
                              LinkedIn Profile
                            </Link>
                          </Button>
                          <Button asChild className="bg-[#333] hover:bg-[#555] text-white"
                            size="iconsm"
                          >
                            <Link href="https://github.com/" target="_blank" rel="noopener noreferrer">
                              <Github className="mr-2 h-4 w-4" />
                              GitHub Profile
                            </Link>
                          </Button>
                          <Button asChild className="bg-[#E4405F] hover:bg-[#c1355e] text-white"
                            size="iconsm"
                          >
                            <Link href="https://github.com/" target="_blank" rel="noopener noreferrer">
                              <Instagram className="mr-2 h-4 w-4" />
                              Instagram Profile
                            </Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-[#e85839] text-[#0d0d0d] text-xs">
        <div className="flex items-center space-x-2">
          <GitBranch className="w-4 h-4" />
          <span>main</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">Last Updated : 19 Nov, 2023</span>
          <span className="hidden sm:inline">Spaces: 2</span>
          <span className="hidden sm:inline">UTF-8</span>
          <span>{currentTime} IST</span>
        </div>
      </div>
    </div>
  )
}