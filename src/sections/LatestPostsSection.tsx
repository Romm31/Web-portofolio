"use client"

import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight, Calendar, Clock, Tag, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.12, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
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
    className="text-center mb-12 space-y-4"
  >
    <h2 className="text-4xl md:text-5xl font-black tracking-tight bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
      {children}
    </h2>
    <motion.div 
      className="h-1 w-24 mx-auto bg-gradient-to-r from-primary/0 via-primary to-primary/0 rounded-full"
      initial={{ width: 0 }}
      whileInView={{ width: 96 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3 }}
    />
  </motion.div>
)

// Empty State Component (centered)
const EmptyState = () => (
  <motion.div
    variants={itemVariants}
    className="col-span-full flex justify-center items-center min-h-[60vh]"
  >
    <Card className="p-12 md:p-16 text-center border border-dashed border-border/50 bg-muted/20 max-w-2xl w-full shadow-lg hover:shadow-primary/20 transition-shadow">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", duration: 0.6 }}
        className="inline-block mb-6"
      >
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted/50 flex items-center justify-center">
          <FileText className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground/50" />
        </div>
      </motion.div>

      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
        No Posts Yet
      </h3>
      <p className="text-sm md:text-base text-muted-foreground max-w-md mx-auto mb-6">
        Stay tuned! I'll be sharing insights about cybersecurity, web development, and CTF challenges soon.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button variant="outline" size="lg" asChild>
          <Link href="/blog" className="gap-2">
            <FileText className="w-4 h-4" />
            Visit Blog
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link href="/blog" className="gap-2">
            <ExternalLink className="w-4 h-4" />
            Browse Notes
          </Link>
        </Button>
      </div>
    </Card>
  </motion.div>
)

// Post Card Component
interface PostCardProps {
  title: string
  summary: string
  date: string
  readTime: string
  tags: string[]
  link: string
}

const PostCard = ({ title, summary, date, readTime, tags, link }: PostCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div variants={itemVariants}>
      <Link href={link}>
        <Card 
          className="group h-full flex flex-col border border-border/50 bg-card/50 backdrop-blur-sm transition-all hover:shadow-2xl hover:border-primary/40 duration-300 overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Gradient Header */}
          <div className="relative h-2 bg-gradient-to-r from-primary/60 via-primary/40 to-primary/60">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary"
              initial={{ x: "-100%" }}
              animate={{ x: isHovered ? "100%" : "-100%" }}
              transition={{ duration: 0.6 }}
            />
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-6">
            <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                <span>{readTime}</span>
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {title}
            </h3>

            <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-1">
              {summary}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
              <span>Read More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

export default function LatestPostsSection() {
  const posts: PostCardProps[] = [] // empty for now

  return (
    <motion.section
      className="relative py-20 md:py-28 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container px-4 md:px-6 space-y-8 flex flex-col items-center text-center">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-6 mb-12">
          <SectionTitle>Latest from the Blog</SectionTitle>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
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
              <Link href="/blog" className="gap-2">
                View All Posts
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>

        {/* Posts Grid or Empty State */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full justify-items-center">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            posts.slice(0, 3).map((post, index) => (
              <PostCard key={index} {...post} />
            ))
          )}
        </div>

        {posts.length === 0 && (
          <motion.div variants={itemVariants} className="text-center mt-8">
            <p className="text-sm text-muted-foreground">
              Want to be notified when I publish new content?{" "}
              <Link href="#contact" className="text-primary hover:underline font-medium">
                Get in touch
              </Link>
            </p>
          </motion.div>
        )}
      </div>

      <Separator className="container mt-16 md:mt-24 opacity-20" />
    </motion.section>
  )
}
