// src/sections/HeroSection.tsx
"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { useTypewriter, Cursor } from "react-simple-typewriter";

// Import data dari file terpisah
import { GITHUB_URL, LINKEDIN_URL, EMAIL, PROFILE_SUMMARY } from "@/data/portfolio";

// Animation variants (disederhanakan untuk Hero saja)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring" as const, stiffness: 100, damping: 20 } as const },
};

export default function HeroSection() {
  const [typeEffect] = useTypewriter({
    words: ['Cybersecurity Enthusiast', 'CTF Player', 'Aspiring Full-Stack Developer'],
    loop: true,
    typeSpeed: 70,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  return (
    <motion.section 
      id="home"
      className="container pt-24 pb-12 md:pt-32 md:pb-16 text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.div 
        className="flex flex-col items-center justify-center space-y-4"
        variants={containerVariants}
      >
        {/* Profile Image (Tetap ditampilkan di Hero) */}
        <motion.div variants={itemVariants}>
            <Avatar className="w-24 h-24 md:w-32 md:h-32 mb-6 shadow-xl border-2 border-primary/50">
                <AvatarImage src="https://github.com/Romm31.png" alt="Profile Picture Erwin Wijaya" />
                <AvatarFallback>EW</AvatarFallback>
            </Avatar>
        </motion.div>
        
        {/* Hi, I'm */}
        <motion.p variants={itemVariants} className="text-xl md:text-2xl text-muted-foreground font-medium">
          Hi, I'm
        </motion.p>
        {/* Main Name */}
        <motion.h1 
          variants={itemVariants} 
          className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-none text-primary"
        >
          Erwin Wijaya
        </motion.h1>
        
        {/* TYPING EFFECT (Tagline) */}
        <motion.p variants={itemVariants} className="text-xl md:text-3xl text-foreground font-semibold h-8 md:h-10 flex items-center justify-center">
            {typeEffect}
            <Cursor cursorStyle='|' cursorColor='var(--primary)' /> 
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="flex space-x-4 pt-6">
            <Button size="lg" asChild>
                <Link href="#projects">View Projects <ArrowRight className="w-4 h-4 ml-2" /></Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
                <Link href="/notes">Read My Blog <BookOpen className="w-4 h-4 ml-2" /></Link>
            </Button>
        </motion.div>

        {/* Social Links */}
        <motion.div variants={itemVariants} className="flex space-x-4 pt-4">
            <Button variant="ghost" size="icon" asChild>
              <a href={GITHUB_URL} target="_blank"><Github className="h-6 w-6" /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={LINKEDIN_URL} target="_blank"><Linkedin className="h-6 w-6 text-blue-600" /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href={EMAIL}><Mail className="h-6 w-6 text-red-500" /></a>
            </Button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}