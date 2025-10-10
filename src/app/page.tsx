// src/app/page.tsx

"use client" // Karena menggunakan Framer Motion

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Link from "next/link"

// Data Proyek Dummy
const projects = [
  { id: 1, title: "Next.js E-Commerce Platform", description: "Full-stack e-commerce solution built with Next.js, Vercel PostgreS, and Stripe.", tags: ["Next.js", "PostgreSQL", "Tailwind"], link: "#" },
  { id: 2, title: "Personal Blogging Site (MDX)", description: "A high-performance blog using MDX for content management and search functionality.", tags: ["React", "MDX", "SEO"], link: "#" },
  { id: 3, title: "Real-time Chat App", description: "Built a scalable WebSocket chat application using React and Node.js.", tags: ["React", "Node.js", "WebSocket"], link: "#" },
]

// Varian Animasi untuk Hero Section
const heroVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      staggerChildren: 0.2 
    } 
  }
}

// Varian Animasi untuk item Proyek
const projectItemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <motion.section 
          id="hero" 
          className="container py-24 text-center"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
            variants={heroVariants}
          >
            Halo, Saya <span className="text-primary">Rommel</span>
          </motion.h1>
          <motion.p 
            className="mt-4 text-xl text-muted-foreground"
            variants={heroVariants}
          >
            Developer Next.js, Ahli dalam UI Modern (Tailwind CSS & shadcn)
          </motion.p>
          <motion.div 
            className="mt-8 space-x-4"
            variants={heroVariants}
          >
            <Button size="lg" asChild>
              <Link href="#projects">Lihat Proyek</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="#contact">Hubungi Saya</Link>
            </Button>
          </motion.div>
        </motion.section>
        
        {/* Projects Section */}
        <section id="projects" className="container py-16">
          <h2 className="text-4xl font-bold mb-10 text-center border-b pb-4">Latest Projects</h2>
          
          <motion.div 
            className="grid gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible" // Animasi dipicu saat masuk viewport
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {projects.map((project, index) => (
              <motion.div key={project.id} variants={projectItemVariants}>
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" asChild>
                      <Link href={project.link}>View Project →</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Placeholder Sections */}
        <section id="skills" className="container py-16 h-[50vh]">
          <h2 className="text-4xl font-bold mb-4 border-b pb-2">Skills</h2>
          <p className="text-muted-foreground">Bagian untuk daftar skill Anda (misalnya: React, Next.js, TypeScript, Docker).</p>
        </section>

        <section id="contact" className="container py-16 h-[50vh]">
          <h2 className="text-4xl font-bold mb-4 border-b pb-2">Contact</h2>
          <p className="text-muted-foreground">Bagian untuk form kontak (sangat disarankan menggunakan React Hook Form + Zod).</p>
        </section>
      </main>
      
      <footer className="w-full border-t py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Rommel. Made with Next.js, Tailwind, and shadcn.
      </footer>
    </div>
  )
}