"use client" 

import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Sparkles, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/blog';
import type { BlogPost } from '@/lib/mdx';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';

interface BlogHeaderProps {
  post: BlogPost;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  const { frontmatter, readingTime } = post;

  return (
    <>
      {/* Navbar */}
      <Navbar />

      <header className="relative pt-16 md:pt-20">
        {/* Hero Image Section */}
        {frontmatter.image && (
          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
            {/* Image */}
            <Image
              src={frontmatter.image}
              alt={frontmatter.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-transparent" />
            
            {/* Animated particles effect */}
            <motion.div
              className="absolute inset-0 opacity-30"
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 flex items-end">
              <div className="container mx-auto px-4 pb-12 md:pb-16">
                <div className="max-w-5xl">
                  {/* Tags & Featured Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex flex-wrap gap-2 mb-4 md:mb-6"
                  >
                    {frontmatter.tags.slice(0, 3).map((tag, index) => (
                      <motion.div
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                      >
                        <Badge 
                          className="backdrop-blur-md bg-background/80 border-border/50 text-foreground hover:bg-primary hover:text-primary-foreground transition-all"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      </motion.div>
                    ))}
                    {frontmatter.featured && (
                      <Badge className="backdrop-blur-md bg-primary/90 text-primary-foreground border-primary/50">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </motion.div>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-4 md:mb-6 text-foreground drop-shadow-2xl"
                  >
                    {frontmatter.title}
                  </motion.h1>

                  {/* Meta Info - Bottom */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="flex flex-wrap items-center gap-4 md:gap-6"
                  >
                    {/* Author */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-background/80 border border-border/50">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-foreground">
                        {frontmatter.author || 'Erwin Wijaya'}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-background/80 border border-border/50">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{formatDate(frontmatter.date)}</span>
                    </div>

                    {/* Reading Time */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md bg-background/80 border border-border/50">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-foreground">{readingTime}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* No Image Fallback */}
        {!frontmatter.image && (
          <div className="relative bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-4 py-20 md:py-32">
              <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-sm font-medium transition-colors group"
                  >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Blog
                  </Link>
                </motion.div>

                {/* Tags */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-wrap gap-2 mb-6"
                >
                  {frontmatter.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      <Tag className="w-3.5 h-3.5 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {frontmatter.featured && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Sparkles className="w-3.5 h-3.5 mr-1" />
                      Featured
                    </Badge>
                  )}
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-6"
                >
                  {frontmatter.title}
                </motion.h1>

                {/* Summary */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8"
                >
                  {frontmatter.summary}
                </motion.p>

                {/* Meta Info */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-wrap items-center gap-6 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {frontmatter.author || 'Erwin Wijaya'}
                      </p>
                      <p className="text-xs text-muted-foreground">Author</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(frontmatter.date)}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime}</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="container mx-auto px-4 mt-8">
          <div className="max-w-4xl mx-auto">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
        </div>
      </header>
    </>
  );
}