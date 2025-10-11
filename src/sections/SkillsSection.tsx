"use client"

import { motion, Variants } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { visualSkillData } from "@/data/portfolio"
import { VisualSkillCard } from "@/components/visual-skill-card"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function SkillsSection() {
  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-background/90 to-background" />

      <motion.div
        className="container mx-auto px-5 sm:px-8 max-w-5xl text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-12 sm:mb-16"
          variants={itemVariants}
        >
          Skills & Expertise
        </motion.h2>

        <motion.div className="space-y-12 sm:space-y-16" variants={containerVariants}>
          {/* FRONTEND */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col items-center border-b border-border/30 pb-3">
              <h3 className="text-lg sm:text-xl font-semibold text-center">
                Frontend & Design
              </h3>
              <Separator className="w-24 mt-2 opacity-40" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {visualSkillData.frontend.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-all"
                >
                  <VisualSkillCard {...skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* BACKEND */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col items-center border-b border-border/30 pb-3">
              <h3 className="text-lg sm:text-xl font-semibold text-center">
                Backend & Languages
              </h3>
              <Separator className="w-24 mt-2 opacity-40" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {visualSkillData.backend.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-all"
                >
                  <VisualSkillCard {...skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* DEVOPS */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="flex flex-col items-center border-b border-border/30 pb-3">
              <h3 className="text-lg sm:text-xl font-semibold text-center">
                Infrastructure & DevOps
              </h3>
              <Separator className="w-24 mt-2 opacity-40" />
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {visualSkillData.infrastructure.map((skill) => (
                <motion.div
                  key={skill.name}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.2 }}
                  className="hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.25)] transition-all"
                >
                  <VisualSkillCard {...skill} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        <Separator className="mt-16 sm:mt-20 opacity-40" />
      </motion.div>
    </section>
  )
}
