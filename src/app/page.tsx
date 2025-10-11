// src/app/page.tsx

"use client"

import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Separator } from "@/components/ui/separator"

// Import Sections
import HeroSection from "@/sections/HeroSection"
import AboutSection from "@/sections/AboutSection"
import SkillsSection from "@/sections/SkillsSection"
import LatestPostsSection from "@/sections/LatestPostsSection"
import ProjectsSection from "@/sections/ProjectsSection"
import ExperienceSection from "@/sections/ExperienceSection"
import ContactSection from "@/sections/ContactSection"

// Import Data untuk Footer
import { FOOTER_BIO, GITHUB_URL, LINKEDIN_URL, EMAIL, TENESYS_URL } from "@/data/portfolio"
import Link from "next/link"

// Global entry animation
const pageEnterVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as const } as const 
  }
};

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background text-foreground">
      
      {/* --- BEAUTIFUL ADAPTIVE BACKGROUND EFFECT --- */}
      {/* Gradient blobs */}
      <div className="absolute inset-0 -z-20">
        <div className="absolute top-[-10%] left-[-20%] w-[500px] h-[500px] 
          bg-gradient-to-r from-primary/30 via-purple-500/10 to-blue-500/10 
          rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[400px] h-[400px] 
          bg-gradient-to-r from-blue-600/20 via-cyan-500/10 to-primary/10 
          rounded-full blur-[100px]" />
      </div>

      {/* Subtle grid overlay (light/dark adaptive) */}
      <div className="absolute inset-0 -z-10 
        bg-[linear-gradient(to_right,rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.04)_1px,transparent_1px)]
        dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] 
        bg-[size:40px_40px]" />

      {/* --- NAVBAR --- */}
      <Navbar />
      
      {/* GLOBAL ENTRY ANIMATION CONTAINER */}
      <motion.main
        initial="hidden"
        animate="visible"
        variants={pageEnterVariant}
      >
        {/* HERO SECTION - KONTENNYA HARUS DI PUSATKAN! */}
        {/* Kita akan ubah HeroSection.tsx secara terpisah, tapi pastikan impornya benar. */}
        <HeroSection />
        <Separator className="container" />

        <AboutSection /> 

        <SkillsSection />

        <LatestPostsSection />

        <ProjectsSection />

        <ExperienceSection />

        <ContactSection />
      </motion.main>
      
      {/* --- FOOTER (4 Kolom) --- */}
      <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-sm pt-12 pb-6 relative z-10">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Kolom 1: About */}
            <div>
                <h4 className="text-lg font-bold mb-4">Erwin Wijaya</h4>
                <p className="text-sm text-muted-foreground mb-4">
                    {FOOTER_BIO}
                </p>
            </div>

            {/* Kolom 2: Quick Links */}
            <div>
                <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link href="/notes" className="text-muted-foreground hover:text-primary transition-colors">Notes</Link></li>
                    <li><Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</Link></li>
                    <li><Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</Link></li>
                    <li><Link href="#experience" className="text-muted-foreground hover:text-primary transition-colors">Experience</Link></li>
                </ul>
            </div>

            {/* Kolom 3: Connect */}
            <div>
                <h4 className="text-lg font-bold mb-4">Connect</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href={GITHUB_URL} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
                    <li><a href={LINKEDIN_URL} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
                    <li><a href={`mailto:${EMAIL}`} className="text-muted-foreground hover:text-primary transition-colors">Email</a></li>
                </ul>
            </div>

            {/* Kolom 4: CTF Teams */}
            <div>
                <h4 className="text-lg font-bold mb-4">CTF Teams</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href={TENESYS_URL} target="_blank" className="text-muted-foreground hover:text-primary transition-colors">Tenesys</a></li>
                </ul>
            </div>
        </div>
        
        {/* Copyright Bar */}
        <div className="container mt-8 pt-4 border-t border-border/40 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Erwin Wijaya. All rights reserved.
        </div>
      </footer>
    </div>
  )
}