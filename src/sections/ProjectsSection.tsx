// src/sections/ProjectsSection.tsx
"use client"

import { useRef } from "react"
import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { projects, GITHUB_URL } from "@/data/portfolio"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    // Perbaikan: Hapus text-center jika tidak diperlukan
    className="text-3xl sm:text-4xl font-extrabold mb-10 text-center tracking-tight"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.h2>
)

export default function ProjectsSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    // Scroll 80% dari lebar container untuk navigasi yang halus
    const scrollAmount = scrollRef.current.clientWidth * 0.8
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <motion.section
      id="projects"
      className="py-24 relative"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={containerVariants}
    >
      <div className="container space-y-8 relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SectionTitle>Featured Projects</SectionTitle>
          <Button variant="link" size="sm" asChild className="text-primary hover:underline font-semibold flex-shrink-0">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              View All on GitHub <FaGithub className="w-4 h-4 ml-2 inline" />
            </a>
          </Button>
        </div>

        {/* Horizontal Scroll Section */}
        <div className="relative group">
          {/* Tombol Panah Kiri (Desktop Only, muncul saat hover group) */}
          <button
            onClick={() => scroll("left")}
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 border border-border/40 hover:border-primary/60 hover:bg-background p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Container Scroll */}
          <motion.div
            ref={scrollRef}
            // Hapus variants itemVariants dari sini karena sudah diterapkan di elemen child
            className="flex gap-6 overflow-x-scroll pb-4 snap-x snap-mandatory scroll-smooth hide-scrollbar px-2 md:px-0"
          >
            {projects.slice(0, 6).map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                // FIX: Gunakan lebar fixed di mobile untuk memicu scroll
                className="min-w-[80vw] sm:min-w-[320px] md:min-w-[360px] lg:min-w-[400px] snap-start"
              >
                <Card className="h-full flex flex-col justify-between border border-border/60 bg-card/70 backdrop-blur-sm rounded-xl transition-all duration-300 hover:shadow-lg hover:border-primary/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-1 line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2 py-1 rounded-full bg-accent/30 text-accent-foreground border border-accent/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </CardContent>

                  <CardFooter className="mt-auto pt-0">
                    <Button
                      variant="link"
                      className="p-0 text-sm text-muted-foreground hover:text-primary group"
                      asChild
                    >
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        View on GitHub{" "}
                        <ExternalLink className="w-4 h-4 ml-2 inline group-hover:translate-x-1 transition-transform" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Tombol Panah Kanan (Desktop Only, muncul saat hover group) */}
          <button
            onClick={() => scroll("right")}
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 border border-border/40 hover:border-primary/60 hover:bg-background p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Separator className="container mt-16" />
    </motion.section>
  )
}