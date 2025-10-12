// src/sections/ProjectsSection.tsx
"use client"

import { useRef, useState } from "react"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, ChevronLeft, ChevronRight, Github, Star, GitFork, Clock, Code2, Sparkles } from "lucide-react"
import { projects, GITHUB_URL } from "@/data/portfolio"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.12 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-center mb-16 md:mb-20 space-y-4"
  >
    <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, type: "spring" }}
      className="inline-block"
    >
      <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center border border-primary/20 shadow-lg">
        <Code2 className="w-8 h-8 md:w-10 md:h-10 text-primary" />
      </div>
    </motion.div>
    
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
      {children}
    </h2>
    
    <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
      Showcase of my latest work and open-source contributions
    </p>
    
    <motion.div 
      className="h-1 w-24 mx-auto bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: 96 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
  </motion.div>
)

// Project Card Component
interface ProjectCardProps {
  title: string
  description: string
  tags: string[]
  link: string
  stars?: number
  forks?: number
  updated?: string
}

const ProjectCard = ({ title, description, tags, link, stars, forks, updated }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="min-w-[85vw] sm:min-w-[340px] md:min-w-[380px] lg:min-w-[420px] snap-start"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="h-full flex flex-col justify-between border border-border/50 bg-card/50 backdrop-blur-sm rounded-2xl transition-all duration-300 hover:shadow-2xl hover:border-primary/40 overflow-hidden group">
        {/* Gradient Top Bar */}
        <div className="relative h-2 bg-gradient-to-r from-primary/60 via-primary/40 to-primary/60">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.6 }}
          />
        </div>

        <div className="flex flex-col flex-1 p-6">
          {/* Header */}
          <div className="mb-4">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 flex-1">
                {title}
              </h3>
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Github className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
              </motion.div>
            </div>
            
            <p className="text-sm md:text-base text-muted-foreground line-clamp-3 leading-relaxed">
              {description}
            </p>
          </div>

          {/* Stats */}
          {(stars || forks || updated) && (
            <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
              {stars !== undefined && (
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5" />
                  <span>{stars}</span>
                </div>
              )}
              {forks !== undefined && (
                <div className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" />
                  <span>{forks}</span>
                </div>
              )}
              {updated && (
                <div className="flex items-center gap-1 ml-auto">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{updated}</span>
                </div>
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 4).map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <Button
            variant="ghost"
            className="w-full mt-auto group/btn hover:bg-primary/10 transition-all"
            asChild
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              <span>View on GitHub</span>
              <ExternalLink className="w-4 h-4 ml-auto group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            </a>
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (!scrollRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
    setTimeout(updateScrollButtons, 300)
  }

  return (
    <motion.section
      id="projects"
      className="relative py-20 md:py-28 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container px-4 md:px-6 space-y-8">
        {/* Header - Centered */}
        <div className="flex flex-col items-center gap-6">
          <SectionTitle>Featured Projects</SectionTitle>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="group border-2 hover:border-primary/50 hover:bg-primary/5 transition-all"
            >
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="gap-2">
                <Github className="w-5 h-5" />
                View All on GitHub
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Horizontal Scroll Section */}
        <div className="relative group/scroll">
          {/* Left Arrow Button */}
          <motion.button
            onClick={() => scroll("left")}
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollLeft ? 1 : 0 }}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-background/90 border-2 border-border hover:border-primary/60 hover:bg-background p-3 rounded-full shadow-xl z-10 backdrop-blur-sm transition-all disabled:opacity-50"
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            whileHover={{ scale: 1.1, x: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Scroll Container */}
          <motion.div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar px-2 md:px-4"
          >
            {projects.slice(0, 6).map((project, index) => (
              <ProjectCard
                key={project.id || index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                link={project.link}
                stars={(project as any).stars}
                forks={(project as any).forks}
                updated={(project as any).updated}
              />
            ))}
          </motion.div>

          {/* Right Arrow Button */}
          <motion.button
            onClick={() => scroll("right")}
            initial={{ opacity: 0 }}
            animate={{ opacity: canScrollRight ? 1 : 0 }}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-background/90 border-2 border-border hover:border-primary/60 hover:bg-background p-3 rounded-full shadow-xl z-10 backdrop-blur-sm transition-all disabled:opacity-50"
            disabled={!canScrollRight}
            aria-label="Scroll right"
            whileHover={{ scale: 1.1, x: 2 }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Gradient Overlays for Visual Cue */}
          <div className="hidden md:block absolute left-0 top-0 bottom-4 w-20 bg-gradient-to-r from-background to-transparent pointer-events-none z-[5]" />
          <div className="hidden md:block absolute right-0 top-0 bottom-4 w-20 bg-gradient-to-l from-background to-transparent pointer-events-none z-[5]" />
        </div>

        {/* Mobile Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="md:hidden text-center text-sm text-muted-foreground flex items-center justify-center gap-2"
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
          <span>Swipe to see more projects</span>
        </motion.div>
      </div>

      <Separator className="container mt-16 md:mt-24 opacity-20" />
    </motion.section>
  )
}