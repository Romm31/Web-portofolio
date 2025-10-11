"use client"

import { motion, Variants } from "framer-motion"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { PROFILE_SUMMARY, GITHUB_URL } from "@/data/portfolio"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

// -------------------- ANIMATION VARIANTS --------------------
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.12, ease: [0.25, 0.1, 0.25, 1] },
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

// -------------------- SECTION TITLE --------------------
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    className="text-4xl sm:text-5xl font-extrabold mb-12 sm:mb-16 text-center tracking-tight"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
  >
    {children}
  </motion.h2>
)

// -------------------- MAIN COMPONENT --------------------
export default function AboutSection() {
  return (
    <section id="about" className="container py-20 sm:py-28 px-5 sm:px-8">
      <SectionTitle>About Me</SectionTitle>

      <motion.div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-14"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Profile Card */}
        <motion.div
          variants={itemVariants}
          className="w-full md:w-1/3 flex justify-center md:justify-start"
        >
          <Card className="relative w-full max-w-xs sm:max-w-sm border border-border/60 bg-card backdrop-blur-sm shadow-md rounded-2xl transition-all hover:shadow-lg hover:border-primary/30">
            <div className="flex flex-col items-center p-8">
              <Avatar className="w-28 h-28 sm:w-32 sm:h-32 shadow-xl ring-2 ring-border/60">
                <AvatarImage src="https://github.com/Romm31.png" alt="Profile Picture" />
                <AvatarFallback>EW</AvatarFallback>
              </Avatar>

              <h3 className="text-xl sm:text-2xl font-bold mt-5 text-foreground">
                Erwin Wijaya
              </h3>

              {/* HoverCard */}
              <HoverCard>
                <HoverCardTrigger asChild>
                  <p className="text-sm sm:text-base text-muted-foreground mt-2 cursor-pointer hover:text-foreground transition-colors">
                    @Romm31
                  </p>
                </HoverCardTrigger>

                <HoverCardContent className="w-80 p-4">
                  <div className="flex gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="https://github.com/Romm31.png" />
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">Erwin Wijaya</h4>
                      <p className="text-sm text-muted-foreground">
                        Full-Stack Developer | CTF Player | Tenesys Member
                      </p>
                      <div className="flex items-center pt-2 text-xs text-muted-foreground">
                        <Github className="w-4 h-4 mr-2 opacity-70" />
                        Active since 2023
                      </div>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>

              <Button asChild variant="outline" className="mt-6 w-full text-sm sm:text-base">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  View GitHub <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </Card>
        </motion.div>

        {/* Summary Text (Justified + Responsive) */}
        <motion.div
          variants={itemVariants}
          className="md:w-2/3 text-justify space-y-6 text-muted-foreground leading-relaxed text-base sm:text-lg md:text-xl"
        >
          {PROFILE_SUMMARY.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}

          <div className="flex justify-center md:justify-start">
            <Button
              variant="link"
              asChild
              className="text-base text-primary hover:underline font-semibold group transition"
            >
              <Link href="#experience">
                See Full History{" "}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>

      <Separator className="container mt-16 sm:mt-20" />
    </section>
  )
}
