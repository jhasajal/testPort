"use client";
import "./App.css";
import useMousePosition from "./useMousePosition.jsx";
import Typewriter from "typewriter-effect";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

//MySkillsStack Icons
import {
  SiNextdotjs,
  SiLeetcode,
  SiCplusplus,
  SiCodeforces,
  SiCodechef,
  SiExpress,
  SiMongodb,
  SiHackerearth,
  SiTypescript,
} from "react-icons/si";
import {
  FaPython,
  FaGithub,
  FaAws,
  FaReact,
  FaDocker,
  FaLinkedinIn,
} from "react-icons/fa";
import { TbBrandNodejs } from "react-icons/tb";
import { DiNginx } from "react-icons/di";
import { BsGit } from "react-icons/bs";
import { IoLogoJavascript } from "react-icons/io5";
import { PiFileSqlFill } from "react-icons/pi";
import styles from "@/components/projects/style.module.scss";
import Titles from "@/components/projects/titles/index";
import Descriptions from "@/components/projects/descriptions/index";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FramerMagnetic from "./utils/framer.js";
import React, { useRef } from "react";
// Register ScrollTrigger plugin
import "./utils/nav.js";
import { useCallback } from 'react'

import { Download } from 'lucide-react'
import { IoMdMail } from "react-icons/io";
import { TbBrandGithubFilled } from "react-icons/tb";
import { AiFillInstagram } from "react-icons/ai";
import { motion, AnimatePresence, mix } from 'framer-motion'
import { TLink } from "./utils/transition";
import Globe from "@/components/ui/globe";
import Cp from "./cp/page"
function App() {
  // hooks
  const [isHovered, setIsHovered] = useState(false);
  const { x, y, scrollY } = useMousePosition();
  // local variables
  const size = isHovered ? 400 : 40;

  function hideMask() {
    console.log("hide mask");
    const mask = document.getElementsByClassName("mask-hero");
    const item = mask[0] as HTMLElement;
    item.style.visibility = "hidden";
  }

  function showMask() {
    console.log("show mask");
    const mask = document.getElementsByClassName("mask-hero");
    const item = mask[0] as HTMLElement;
    item.style.visibility = "visible";
  }

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  function navHighlight() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY;
    sections.forEach((section) => {
      const sectionHeight = (section as HTMLElement).offsetHeight;
      const sectionTop =
        section.getBoundingClientRect().top + window.pageYOffset - 50;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        const mainNav = document.getElementsByClassName("mainNav")[0];
        const mainNavChildren = mainNav.children;
        for (let i = 0; i < mainNavChildren.length; i++) {
          const child = mainNavChildren[i];
          if (child.getAttribute("href") === `#${sectionId}`) {
            child.classList.add("nav-active");
          } else {
            child.classList.remove("nav-active");
          }
        }
      }
    });
  }

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    const mainNav = document.getElementsByClassName("mainNav")[0];
    const mainNavChildren = mainNav.children;

    window.addEventListener("scroll", navHighlight);

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  const DATA = {
    contact: {
      languages: {
        CPP: {
          name: "C++",
          url: "#",
          icon: SiCplusplus,
        },
        Python: {
          name: "Python",
          url: "#",
          icon: FaPython,
        },
        JS: {
          name: "JavaScript",
          url: "#",
          icon: IoLogoJavascript,
        },
      },
      social: {
        "CodeChef - DIV 2": {
          name: "CodeChef",
          url: "#",
          icon: SiCodechef,
        },
        "LeetCode - 180+": {
          name: "LeetCode",
          url: "#",
          icon: SiLeetcode,
        },
        "CodeForces - 800+": {
          name: "CodeForces",
          url: "#",
          icon: SiCodeforces,
        },
        "HackerEarth - pt:300+": {
          name: "HackerEarth",
          url: "#",
          icon: SiHackerearth,
        },
      },
      Deve: {
        MongoDB: {
          name: "MongoDB",
          url: "#",
          icon: SiMongodb,
        },
        Express: {
          name: "Express",
          url: "#",
          icon: SiExpress,
        },
        REACT: {
          name: "REACT",
          url: "#",
          icon: FaReact,
        },
        NextJS: {
          name: "NEXTJS",
          url: "#",
          icon: SiNextdotjs,
        },
        TypeScript: {
          name: "TypeScript",
          url: "#",
          icon: SiTypescript,
        },
        NodeJS: {
          name: "NodeJS",
          url: "#",
          icon: TbBrandNodejs,
        },
        SQL: {
          name: "SQL",
          url: "#",
          icon: PiFileSqlFill,
        },
      },
      tool: {
        Github: {
          name: "Github",
          url: "#",
          icon: FaGithub,
        },
        AWS: {
          name: "AWS",
          url: "#",
          icon: FaAws,
        },
        Docker: {
          name: "Docker",
          url: "#",
          icon: FaDocker,
        },
        Nginx: {
          name: "Nginx",
          url: "#",
          icon: DiNginx,
        },
        Git: {
          name: "Git",
          url: "#",
          icon: BsGit,
        },
      },
    },
  };

  const tableData = [
    {
      title: "LANGUAGES",
      description: (
        <TooltipProvider>
          <Dock className="">
            {Object.entries(DATA.contact.languages).map(([name, languages]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      aria-label={languages.name}
                      className={cn(
                        buttonVariants({
                          variant: "Sajalcustom",
                          size: "icon", // default is md
                        }),
                        " rounded-full"
                      )}
                      onMouseEnter={hideMask}
                      onMouseLeave={showMask}
                    >
                      <languages.icon id="hvr-grow" className="size-2" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      ),
      altDescription:
        "How I talk to computers and make ideas happen and the syntax I wrestle with.",
    },

    {
      title: "PROBLEM SOLVING",
      description: (
        <TooltipProvider>
          <Dock className="">
            {Object.entries(DATA.contact.social).map(([name, social]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      aria-label={social.name}
                      className={cn(
                        buttonVariants({
                          variant: "Sajalcustom",
                          size: "icon", // default is md
                        }),
                        " rounded-full"
                      )}
                      onMouseEnter={hideMask}
                      onMouseLeave={showMask}
                    >
                      <social.icon className="size-2 " />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      ),
      altDescription:
        " Where I pit my logic against tricky problems and hope to come out victorious.",
    },
    {
      title: "DEVELOPMENT",
      description: (
        <TooltipProvider>
          <Dock className="">
            {Object.entries(DATA.contact.Deve).map(([name, Deve]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      aria-label={Deve.name}
                      className={cn(
                        buttonVariants({
                          variant: "Sajalcustom",
                          size: "icon", // default is md
                        }),
                        " rounded-full"
                      )}
                      onMouseEnter={hideMask}
                      onMouseLeave={showMask}
                    >
                      <Deve.icon className="size-2 " />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      ),
      altDescription:
        "Where ideas meet code and occasionally crash",
    },
    {
      title: "TOOLS",
      description: (
        <TooltipProvider>
          <Dock className="">
            {Object.entries(DATA.contact.tool).map(([name, tool]) => (
              <DockIcon key={name}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      aria-label={tool.name}
                      className={cn(
                        buttonVariants({
                          variant: "Sajalcustom",
                          size: "icon", // default is md
                        }),
                        " rounded-full"
                      )}
                      onMouseEnter={hideMask}
                      onMouseLeave={showMask}
                    >
                      <tool.icon className="w-10 h-10 " />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{name}</p>
                  </TooltipContent>
                </Tooltip>
              </DockIcon>
            ))}
          </Dock>
        </TooltipProvider>
      ),
      altDescription:
        "The trusty sidekicks that keep everything running (most of the time)",
    },
  ];

  const ProjectData = [
    {
      title: "DSA",
      description:
        "Projects focused on solving algorithmic challenges using data structures and algorithms.",
      speed: 0.5,
      i: 0,
    },
    {
      title: "MERN",
      description:
        "Full-stack web applications built with MongoDB, Express, React, and Node.js.",
      speed: 0.5,
      i: 1,
    },
    {
      title: "HACKATHON",
      description:
        "Innovative projects created under tight deadlines, showcasing rapid development and collaboration.",
      speed: 0.67,
      i: 2,
    },
    {
      title: "LIVE",
      description:
        "Real-world, deployed projects that are actively being used by real users.",
      speed: 0.8,
      i: 3,
    },
  ];

  //Page transiton 
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isExpanding, setIsExpanding] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [count, setCount] = useState(0)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  const startTransition = () => {
    setIsTransitioning(true)
    setIsExpanding(true)
    let currentCount = 0
    const interval = setInterval(() => {
      currentCount += 1
      setCount(currentCount)
      if (currentCount >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          setIsExpanding(false)
        }, 5000)
      }
    }, 20)
  }
  //

  // const containerRef = useRef(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: [1] }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const parallax = (options: { speed: number }) => {
    // Implement the parallax function here
    return options;
  };

  const parallaxEffect = parallax({
    speed: -10,
  });

  const [isTextVisible, setIsTextVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTextVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleDownload = () => {
    const fileUrl = 'https://example.com/path-to-your-resume.pdf'
    const link = document.createElement('a')
    link.href = fileUrl
    link.download = 'SajalJha-resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }



  function rgb(arg0: number, arg1: number, arg2: number): import("csstype").Property.Background<string | number> | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <main suppressHydrationWarning>
      <nav className="fixed pl-[2%] top-0 h-screen w-20 flex flex-col items-center justify-between py-8 bg-transparent z-[10]">
        {/* leftside up */}
        <div className="top-8 left-8 flex items-center  ">
          <div className="fixed  top-8 left-9 flex "
             onMouseEnter={hideMask}
             onMouseLeave={showMask}
          >
            <FramerMagnetic>
              <TLink href="/port"
              >

                <div
               
                ></div>

                <Button
                  variant="main"
                  size="main"
                  className="z-10"

                >
                  <svg
                    className="w-14 h-14"
                    viewBox="0 0 125 125"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="62.5" cy="62.5" r="62.5" fill="" />
                    <path
                      d="M61.25 20.9375H99.8125V63.75L61.25 20.9375ZM20.4375 46.0625H20.0625C20.0625 37.4792 22.3958 31.1458 27.0625 27.0625C31.7292 22.9792 38.9167 20.9375 48.625 20.9375L99.8125 83.0625C99.8125 91.3125 97.5833 97.2083 93.125 100.75C88.7917 104.208 81.7083 105.938 71.875 105.938L20.4375 46.0625ZM20.25 62.9375L57.375 106H20.25V62.9375Z"
                      fill="#e85839"
                    />
                  </svg>
                </Button>

              </TLink>
            </FramerMagnetic>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out pl-2"
              style={{
                width: isTextVisible ? "180px" : "0",
                marginLeft: isTextVisible ? "0.5rem" : "0",
              }}
            >
              <ArrowLeft className="w-4 h-4 text-[#afa18f] inline-block" />
              <span className="text-sm font-medium whitespace-nowrap pl-2 pt-2 text-[#afa18f]">
                Know About Me
              </span>
            </div>
          </div>
        </div>

        {/* leftside down */}
        <div className="flex flex-col py-4 gap-6">
          <FramerMagnetic>
            <Link
              href="mailto:sajaljha.official@gmail.com"
              onMouseEnter={hideMask}
              onMouseLeave={showMask}
            >
              <IoMdMail className="w-[3vh] h-[3vh]  cursor-pointer fill-[#afa18f] transition-colors duration-[0.3s] hover:fill-[#e85839]" />
            </Link>
          </FramerMagnetic>
          <FramerMagnetic>
            <Link
              href="https://www.linkedin.com/in/sajal-jha-1b1b3b1b1/"
              onMouseEnter={hideMask}
              onMouseLeave={showMask}
            >
              <FaLinkedinIn className="w-[3vh] h-[3vh]  cursor-pointer fill-[#afa18f] transition-colors duration-[0.3s] hover:fill-[#e85839]" />
            </Link>
          </FramerMagnetic>
          <FramerMagnetic>
            <Link href=""
              onMouseEnter={hideMask}
              onMouseLeave={showMask}
            >


              <TbBrandGithubFilled className="w-[3vh] h-[3vh]  cursor-pointer fill-[#afa18f] transition-colors duration-[0.3s] hover:fill-[#e85839]" />
            </Link>
          </FramerMagnetic>
          <FramerMagnetic>
            <Link href=""
              onMouseEnter={hideMask}
              onMouseLeave={showMask}
            >
              <AiFillInstagram className="w-[3vh] h-[3vh]  cursor-pointer fill-[#afa18f] transition-colors duration-[0.3s] hover:fill-[#e85839]" />
            </Link>
          </FramerMagnetic>
        </div>
      </nav>

      <header className="flex flex-col">
        <nav className="mainNav text-[#afa18f]">
          <a
            className="nav-active flipbox"
            href="#aboutpage"
            onMouseEnter={hideMask}
            onMouseLeave={showMask}
          >
            {/* apply box flip effect */}
            <div className="relative w-full h-full transform transition-transform duration-700 flip-box-inner">
        <div className="absolute w-full h-full backface-hidden flip-box-front bg-transparent flex items-center justify-center">
          About
        </div>
        <div className="absolute w-full h-full backface-hidden flip-box-back bg-transparent flex items-center justify-center transform rotate-x-180">
          About
        </div>
      </div>
          </a>
          <a href="#workpage" onMouseEnter={hideMask} onMouseLeave={showMask}>
            Work
          </a>
          <a href="#contactpage" onMouseEnter={hideMask} onMouseLeave={showMask}>
            Contact
          </a>
        </nav>

        <div className="">
          <Button
            variant="main"
            size="sm"
            className="text-[#afa18f] bottom-[10%] right-4 rotate-90 fixed"
            onClick={handleDownload}
            onMouseEnter={hideMask}
            onMouseLeave={showMask}
          >
            {/* <Download className="w-[2vh] h-[2vh]"></Download> */}
            <span className="mr-2">Resume</span>
          </Button>
        </div>
      </header>

      {/* mask content */}
      <motion.div
        className="mask-hero absolute w-full bg-grey top-0 z-[2]"
        animate={{
          WebkitMaskPosition: `${(x ?? 0) - size / 2}px ${(y ?? 0) + scrollY - size / 2
            }px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.75,
          velocity: 4,
        }}
      >
        {/* hero */}
        <section
          id="aboutpage"
          className="flex pl-[10%] h-screen w-full items-center bg-[#e85839]"
        >
          <div
            className="text-center"
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            <div className=" text-[#0d0d0d]  text-[8vh] font-bold leading-none">
              <span className="flex text-[#0d0d0d] justify-start flex-col items-start">
                <p>I AM</p>
                <p>So Much More..</p>
              </span>
            </div>
          </div>
        </section>

        {/* about */}
        <section
          id="aboutpage"
          className="h-screen  w-full pl-[10%] pr-[10%]  bg-[#e85839]"
        >
          <div className="">
            <h3 className="text-[#0d0d0d] text-[2.5vh] pt-4 cursor-default ">
              ABOUT ME
            </h3>
            <div
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              <p className="text-[#0d0d0d] text-[7vh] capitalize  font-bold  pt-10 leading-tight cursor-default">
                While I can solve complex problems in minutes, I might still
                take hours thinking and debugging my code to get everything just
                right. For me, solving problems is about finding the right
                balance between logic and creativity.
              </p>
            </div>
            <div className="pt-6">
              <p className="text-[#0d0d0d] text-[3vh] pt-4 z-[9999] hover:text-[#0d0d0d]">
                <TLink href="/about">
                  <div
                    onMouseEnter={hideMask}
                    onMouseLeave={showMask}
                  >
                  READ MORE
                  </div>
                </TLink>
              </p>
            </div>
          </div>
        </section>

        {/* tech stack */}
        <section id="workpage" className="h-screen w-full bg-[#e85839] pl-[10%]">
          <div className="flex w-full flex-col overflow-hidden justify-center h-screen">
            <span className=" text-[#0d0d0d] text-[2.5vh] pt-4 ">
              MY SKILL STACK
            </span>
            <div className="w-full h-full pr-10  pt-10 justify-start text-[#0d0d0d]">
              <Table>
                <TableBody>
                  {tableData.map((item, index) => (
                    <TableRow
                      key={index}
                      className="relative overflow-hidden h-20 hover:bg-transparent"
                    >
                      <TableCell
                        className='font-bold w-1/3 text-[4vh] cursor-pointer z-10 relative transition-colors duration-300'
                      >

                        {item.title}

                      </TableCell>
                      <TableCell
                        className="z-10 w-2/3 text-[2.5vh] font-medium uppercase relative transition-colors duration-300">
                        <div className=" h-full">
                          <p className="">

                          </p>
                        </div>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        {/* filler1*/}
        <section className="h-[150vh] w-full px-[10%] bg-[#e85839]">
          {/* <div className=" w-full flex flex-col justify-center items-center h-screen text-center pl-[10%] pr-[10%] leading-none">
            <p
              className="  text-[#0d0d0d] text-[7vh] font-bold uppercase pb-10"
              onMouseEnter={() => {
                setIsHovered(true);
              }}
              onMouseLeave={() => {
                setIsHovered(false);
              }}
            >
              It's a journey in progress! to turn bugs into breakthroughs.
            </p>
            <button
              className="group relative px-6 py-3 text-lg font-semibold rounded-md transition-all duration-300 ease-in-out uppercase
                 overflow-hidden"
              onMouseEnter={hideMask}
              onMouseLeave={showMask}
            >
              <span className="relative z-10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">

                <FaRankingStar className="w-5 h-5 transition-all duration-300 transform opacity-0 group-hover:opacity-100 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 z-0 bg-[#e85839] transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
            </button>
          </div> */}
        </section>

        {/* projects */}
        <section className="h-screen w-full pl-[10%] bg-[#e85839]"></section>

        {/* filler2*/}
        <section id="contactpage" className="w-full pl-[10%] pr-[10%] flex justify-center items-center h-screen text-center bg-[#e85839] leading-none">
          <div
            className="pl-[10%] pr-[10%] "
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            <p className="text-[#0d0d0d] text-[9vh] uppercase font-extrabold ">
              but it will never <br /> be perfect enough...
            </p>
          </div>
        </section>

        <footer className="w-full bg-[#e85839] text-[#0d0d0d] py-10 px-8">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-sm mb-12 tracking-wide font-bold text-[#0d0d0d]">CONNECT</h2>
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="w-1/10 hidden md:block">
                {/* This empty div creates space on the left */}
              </div>

              <div className="space-y-4">
                <div className="group text-[#0d0d0d]">
                  <Link
                    href="https://dribbble.com"
                    className="text-[3vh] font-bold transition-colors duration-200 flex items-center gap-2 ">
                    <span className="text-[#0d0d0d]">›</span>
                    About Me
                  </Link>
                </div>
                <div className="group text-[#0d0d0d]">
                  <Link
                    href="https://youtube.com"
                    className="text-[3vh] font-bold transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-[#0d0d0d]">›</span>
                    Projects
                  </Link>
                </div>
                <div className="group text-[#0d0d0d]">
                  <Link
                    href="https://linkedin.com"
                    className="text-[3vh] font-bold transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-[#0d0d0d]">›</span>
                    My LinkTee
                  </Link>
                </div>
              </div>


              <div className="space-y-4 pr-[15%]">
                <div>
                  <h3 className="text-sm mb-2 font-bold">Email</h3>
                  <Link
                    href="mailto:Sajaljha.official@gmail.com"
                    className="text-sm font-bold transition-colors duration-200 flex items-center gap-2"
                  >
                    <span className="text-[#0d0d0d]">›</span>
                    Sajaljha.official@gmail.com
                  </Link>
                </div>
                <div>
                </div>
              </div>
            </div>
          </div>
        </footer>

      </motion.div>
      {/* END mask content */}

      {/* body content */}

      {/* Hero */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "#0d0d0d",
          display: "flex",
          alignItems: "center",
          
        }}
       
        id="about">

        <div className="flex flex-col pl-[10%]">
          <div className=" text-[#afa18f]  text-[8vh] font-bold leading-none">
            I AM
            <span className="text-[#ec4e39]">
              <Typewriter
                options={{
                  strings: ["SAJAL JHA", "A DEVELOPER", "A PROBLEM SOLVER"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </span>
          </div>
          <p className=" text-[#afa18f]">  </p>
        </div>

      </div>

      {/* about */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "#0d0d0d",
          paddingLeft: "10%",
          paddingRight: "10%",
          textTransform: "capitalize",
        }}
         className="aboutp"
      >
        <h3 className="text-[#afa18f] font-custom-Avant-N text-[2.5vh] pt-4 cursor-pointer  ">
          ABOUT ME
        </h3>
        <p className="text-[#afa18f] text-[7vh] capitalize font-bold pt-10 leading-tight">
          A developer and problem solver. With a strong background in{" "}
          <span className="text-[#e85839]">(DSA)</span> and{" "}
          <span className="text-[#e85839]">(CP)</span>, I specialize in finding
          optimized solutions to complex problems.Whether it's building
          applications or solving coding challenges
        </p>
        <div className="pt-6">
          <p className="text-[#afa18f] text-[3vh] pt-4 z-[9999] hover:text-[#e85839]"onMouseEnter={hideMask} onMouseLeave={showMask} >
            <a href="./about">
              READ MORE
            </a>
          </p>
        </div>
      </div>

      {/* stack */}
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#0d0d0d",
          position: "relative",
     
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            backgroundImage: "url()",
            backgroundSize: "fit",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            mixBlendMode: "overlay",
          }}
        >
          {/* bg image */}

        </div>

        <div className="px-[10%]">
        <div className="flex w-full flex-col overflow-hidden justify-center h-screen">
          <span className="text-[#807669] text-[2.5vh] pt-4 ">
            MY SKILL STACK
          </span>
          <div className="w-full h-full pr-10  pt-10 justify-start">
            <Table>
              <TableBody>
                {tableData.map((item, index) => (
                  <TableRow
                    key={index}
                    className="relative overflow-hidden h-20 hover:bg-transparent"
                  >
                    <TableCell
                      className={`font-bold w-1/3 text-[4vh] cursor-pointer z-10 relative transition-colors duration-300 ${hoveredIndex === index
                        ? "text-[#0d0d0d]"
                        : "text-[#afa18f]"
                        }`}
                    >
                      <a
                        onMouseEnter={() => {
                          setHoveredIndex(index);
                          hideMask;
                        }}
                        onMouseLeave={() => {
                          setHoveredIndex(null);
                          showMask;
                        }}
                        href=""
                      >
                        {item.title}
                      </a>
                    </TableCell>
                    <TableCell
                      className={`z-10 w-2/3 text-[2.5vh] font-medium uppercase relative transition-colors duration-300 ${hoveredIndex === index
                        ? "text-[#0d0d0d]"
                        : "text-[#afa18f]"
                        }`}
                      onMouseEnter={() => setIsCursorVisible(false)}
                      onMouseLeave={() => setIsCursorVisible(true)}
                    >
                      <div className=" h-full">
                        <p className="">
                          {hoveredIndex === index
                            ? item.altDescription
                            : item.description}
                        </p>
                      </div>
                    </TableCell>
                    <div
                      className={`absolute inset-0 bg-[#e85839] transition-all duration-800 ease-in-out ${hoveredIndex === index
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0"
                        }`}
                      style={{
                        transformOrigin: "center",
                      }}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        </div>
        </div>
      

      {/* cp profile */}
      <div
        style={{
          width:"100%",
          height: "150vh",
          display: "flex",
          paddingTop: "20vh",
          background: "#0d0d0d",
          position: "relative",
        }}
      >
         <img
          src="/cpp.png"
          alt="C++"
          className="floating"
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "150px", // Adjust the size as needed
            height: "auto",
            zIndex: 1,
            opacity: 0.3, // Adjust the opacity as needed
          }}
        />

<img
          src="/python.png"
          alt="python"
          className="floating2"
          style={{
            position: "absolute",
            bottom: "5vh",
            left: "0",
            width: "150px", // Adjust the size as needed
            height: "auto",
            zIndex: 1,
            opacity: 0.3, // Adjust the opacity as needed
          }}
        />
        
    
        <div className="w-full h-screen px-[10%] z-[5]"
        onMouseEnter={hideMask}
        onMouseLeave={showMask}
        >
          <Cp />
        </div>
        
      </div>

      {/* projects */}
      <div
        style={{
          height: "100vh",
          backgroundColor: "#0d0d0d",
          display: "flex",
          position: "relative",
        }}
      >


<div
          style={{
            position: "absolute",
            right: 0,
            width: "50%", // Adjust the width as needed
            height: "h-screen",
            zIndex: 1, // Ensure the background image is below other content
            opacity: 0.3, // Adjust the opacity as needed
            // background: rgb(2,0,36),
            
          }}
          className="floatinge"
        >
          <Globe className="pt-16" />
        </div>


        <div
        style={
          {
            paddingLeft: "10%",
            paddingRight: "10%",
            zIndex: 2
          }
        }
        >
        <h3 className="text-[#afa18f] font-custom-Avant-N text-[2.5vh] pb-10 pt-4 ">
          Projects
        </h3>
        <div className="z-[10]">
        <div className={styles.container}>
          <Titles data={ProjectData} setSelectedProject={setSelectedProject} />
          <Descriptions data={ProjectData} selectedProject={selectedProject} />
        </div>
      </div>
      </div>
      </div>


      {/* filler */}
      <div className=" w-full flex justify-center items-center h-screen text-center bg-[#0d0d0d] pl-[10%] pr-[10%] leading-none">
        <p className="  text-[#afa18f] text-[9vh] font-bold uppercase">
          Not stopping until <br /> it's{" "}
          <span className="text-[#e85839]"> perfect... </span>
        </p>
      </div>

      {/* END body content */}

      {/* page transition  */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ clipPath: `circle(0px at ${mousePosition.x}px ${mousePosition.y}px)` }}
            animate={{
              clipPath: isExpanding
                ? `circle(150% at ${mousePosition.x}px ${mousePosition.y}px)`
                : `circle(0px at ${mousePosition.x}px ${mousePosition.y}px)`
            }}
            exit={{ clipPath: `circle(0px at ${mousePosition.x}px ${mousePosition.y}px)` }}
            transition={{ duration: 1, ease: "easeInOut" }}
            onAnimationComplete={() => {
              if (!isExpanding) {
                setIsTransitioning(false)
                setCount(0)
              }
            }}
            className="fixed inset-0 bg-[#e85839] flex items-center justify-center"
          >
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="text-white text-9xl font-bold font-mono tracking-tight flex items-center justify-center"
                style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}
              >
                <motion.span
                  key={count}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {count}
                </motion.span>
                <span className="text-5xl ml-2">%</span>
              </motion.div>
              <svg className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64">
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="50%"
                  cy="50%"
                  r="48%"
                  fill="none"
                  stroke="white"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: count / 100 }}
                  transition={{ duration: 3.02, ease: "linear" }}
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <footer className="w-full bg-[#0d0d0d] text-[#afa18f] py-10 px-8 z-[999]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-sm mb-12 tracking-wide font-bold">CONNECT</h2>
          <div className="flex flex-col md:flex-row justify-between gap-8">
            <div className="w-1/10 hidden md:block">
              {/* This empty div creates space on the left */}
            </div>

            <div className="space-y-4">
              <div className="group"
                onMouseEnter={hideMask}
                onMouseLeave={showMask}
              >
                <Link
                  href="https://dribbble.com"
                  className="text-[3vh] font-bold transition-colors duration-200 flex items-center gap-2 group-hover:text-[#e85839]"

                >
                  <span className="text-[#e85839]">›</span>
                  About Me
                </Link>
              </div>
              <div className="group">
                <Link
                  href="https://youtube.com"
                  className="text-[3vh] font-bold transition-colors duration-200 flex items-center gap-2 group-hover:text-[#e85839]"
                  onMouseEnter={hideMask}
                  onMouseLeave={showMask}
                >
                  <span className="text-[#e85839]">›</span>
                  Projects
                </Link>
              </div>
              <div className="group">
                <Link
                  href="https://linkedin.com"
                  className="text-[3vh] font-bold transition-colors duration-200 flex items-center gap-2 group-hover:text-[#e85839]"
                  onMouseEnter={hideMask}
                  onMouseLeave={showMask}
                >
                  <span className="text-[#e85839]">›</span>
                  My LinkTee
                </Link>
              </div>
            </div>


            <div className="space-y-4 pr-[15%]">
              <div>
                <h3 className="text-sm mb-2 font-bold"
                >Email</h3>
                <Link
                  href="mailto:Sajaljha.official@gmail.com"
                  className="text-sm font-bold hover:text-[#e85839] transition-colors duration-200 flex items-center gap-2"
                  onMouseEnter={hideMask}
                  onMouseLeave={showMask}
                >
                  <span className="text-[#e85839]">›</span>
                  Sajaljha.official@gmail.com
                </Link>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default App;
