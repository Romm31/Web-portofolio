"use client"

import { motion, Variants } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { dummyPosts } from "@/data/portfolio"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0.2, staggerChildren: 0.1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <motion.h2
    className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-10 text-center sm:text-left"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.h2>
)

export default function LatestPostsSection() {
  return (
    <motion.section
      className="py-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="container space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <SectionTitle>Latest Posts</SectionTitle>
          <Button variant="link" size="sm" asChild className="text-primary hover:underline font-semibold">
            <Link href="/notes">
              View All
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyPosts.slice(0, 3).map((post, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="group h-full flex flex-col border border-border/60 bg-card backdrop-blur-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-primary/40 duration-300">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-1 line-clamp-2">
                    {post.summary}
                  </CardDescription>
                </CardHeader>

                <CardFooter className="mt-auto pt-2">
                  <Button variant="link" asChild className="p-0 text-sm text-muted-foreground hover:text-primary">
                    <Link href={post.link}>
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Separator className="container mt-16" />
    </motion.section>
  )
}
