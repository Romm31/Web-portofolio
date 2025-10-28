"use client" 

import { motion } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/blog';
import type { BlogPost } from '@/lib/mdx';

interface BlogHeaderProps {
  post: BlogPost;
}

export default function BlogHeader({ post }: BlogHeaderProps) {
  const { frontmatter, readingTime } = post;

  return (
    <header className="relative">
      {/* Background Image with Overlay */}
      {frontmatter.image && (
        <div className="absolute inset-0 h-[400px] sm:h-[500px] -z-10">
          <Image
            src={frontmatter.image}
            alt={frontmatter.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>
      )}

      <div className="container mx-auto px-4 pt-32 pb-12">
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
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors group"
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
              <Link
                key={tag}
                href={`/blog/tag/${tag.toLowerCase()}`}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
              >
                <Tag className="w-3.5 h-3.5" />
                {tag}
              </Link>
            ))}
            {frontmatter.featured && (
              <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-semibold">
                ⭐ Featured
              </span>
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
            className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">
                  {(frontmatter.author || 'Erwin Wijaya')[0]}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {frontmatter.author || 'Erwin Wijaya'}
                </p>
                <p className="text-xs text-muted-foreground">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(frontmatter.date)}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{readingTime}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Divider */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>
      </div>
    </header>
  );
}