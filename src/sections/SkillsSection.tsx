// src/sections/SkillsSection.tsx
"use client"

import { motion, Variants } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { visualSkillData } from "@/data/portfolio" 
import { VisualSkillCard } from "@/components/visual-skill-card"
import { Code2, Server, Cloud, Sparkles } from "lucide-react"
import { useState } from "react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const cardVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
}

// Category Header Component
interface CategoryHeaderProps {
  icon: React.ReactNode
  title: string
  subtitle: string
}

const CategoryHeader = ({ icon, title, subtitle }: Omit<CategoryHeaderProps, 'gradient'>) => (
  <motion.div 
    variants={itemVariants}
    className="relative mb-8"
  >
    <div className="flex flex-col items-center justify-center gap-3 p-6 md:p-8 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 shadow-lg hover:border-border transition-all max-w-2xl mx-auto">
      <motion.div 
        className="flex-shrink-0"
        animate={{
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-muted/50 flex items-center justify-center backdrop-blur border border-border shadow-md">
          {icon}
        </div>
      </motion.div>
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
          {title}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground mt-1">
          {subtitle}
        </p>
      </div>
    </div>
  </motion.div>
)

// Skill Grid Component with Hover Effect
interface SkillGridProps {
  skills: Array<any>
  category: string
}

const SkillGrid = ({ skills, category }: SkillGridProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <motion.div 
      className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto"
      variants={containerVariants}
    >
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          variants={cardVariants}
          whileHover={{ 
            scale: 1.1,
            zIndex: 10,
          }}
          onHoverStart={() => setHoveredIndex(index)}
          onHoverEnd={() => setHoveredIndex(null)}
          className="relative group"
        >
          {/* Glow effect on hover */}
          {hoveredIndex === index && (
            <motion.div
              layoutId={`glow-${category}`}
              className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          <div className="relative">
            <VisualSkillCard {...skill} />
            
            {/* Hover overlay with animation */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl pointer-events-none"
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 md:py-28 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        
        {/* Animated gradient blobs */}
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <motion.div
        className="container mx-auto max-w-7xl px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Section Title */}
        <motion.div
          variants={itemVariants}
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
            Skills & Expertise
          </h2>
          
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I work with
          </p>
          
          <motion.div 
            className="h-1 w-24 mx-auto bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </motion.div>

        <div className="space-y-16 md:space-y-20">
          {/* FRONTEND */}
          <motion.div variants={itemVariants}>
            <CategoryHeader
              icon={<Code2 className="w-7 h-7 md:w-8 md:h-8 text-foreground" />}
              title="Frontend & Design"
              subtitle="Building beautiful and responsive user interfaces"
            />
            <SkillGrid skills={visualSkillData.frontend} category="frontend" />
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 max-w-md mx-auto"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>

          {/* BACKEND */}
          <motion.div variants={itemVariants}>
            <CategoryHeader
              icon={<Server className="w-7 h-7 md:w-8 md:h-8 text-foreground" />}
              title="Backend & Languages"
              subtitle="Crafting robust server-side solutions and APIs"
            />
            <SkillGrid skills={visualSkillData.backend} category="backend" />
          </motion.div>

          {/* Decorative Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-4 max-w-md mx-auto"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
              <div className="w-2 h-2 rounded-full bg-muted-foreground/40" />
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </motion.div>

          {/* INFRASTRUCTURE */}
          <motion.div variants={itemVariants}>
            <CategoryHeader
              icon={<Cloud className="w-7 h-7 md:w-8 md:h-8 text-foreground" />}
              title="Infrastructure & DevOps"
              subtitle="Deploying and managing scalable cloud infrastructure"
            />
            <SkillGrid skills={visualSkillData.infrastructure} category="infrastructure" />
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {[
            { label: "Frontend", value: visualSkillData.frontend.length, icon: Code2 },
            { label: "Backend", value: visualSkillData.backend.length, icon: Server },
            { label: "DevOps", value: visualSkillData.infrastructure.length, icon: Cloud },
            { label: "Total", value: visualSkillData.frontend.length + visualSkillData.backend.length + visualSkillData.infrastructure.length, icon: Sparkles },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all shadow-lg hover:shadow-xl group"
            >
              <div className="flex items-center justify-between mb-3">
                <stat.icon className="w-6 h-6 text-foreground group-hover:scale-110 transition-transform" />
                <motion.div
                  className="text-3xl md:text-4xl font-black text-foreground"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                >
                  {stat.value}
                </motion.div>
              </div>
              <p className="text-sm text-muted-foreground font-medium">{stat.label} Skills</p>
            </motion.div>
          ))}
        </motion.div>

        <Separator className="mt-20 md:mt-28 opacity-20" />
      </motion.div>
    </section>
  )
}