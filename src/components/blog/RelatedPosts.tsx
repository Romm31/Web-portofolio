// src/components/blog/RelatedPosts.tsx
"use client" 

import { motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { Calendar, Clock, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/blog';
import type { BlogPost } from '@/lib/mdx';
import { Badge } from '@/components/ui/badge';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>You might also like</span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Related Posts
            </h2>
          </div>

          {/* Scroll hint for mobile */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:hidden flex items-center gap-2 text-xs text-muted-foreground"
          >
            <span>Swipe</span>
            <ArrowRight className="w-4 h-4" />
          </motion.div>
        </div>
        
        {/* Posts Container - Horizontal scroll on mobile, grid on desktop */}
        <div className="relative">
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex-shrink-0 w-[85vw] sm:w-96 snap-start"
                >
                  <PostCard post={post} index={index} />
                </motion.article>
              ))}
            </div>
          </div>

          {/* Desktop: Grid */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PostCard post={post} index={index} />
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Custom scrollbar hide */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

// Post Card Component
function PostCard({ post, index }: { post: BlogPost; index: number }) {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  return (
    <Link href={`/blog/${post.slug}`} className="block group h-full">
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.3 }}
        style={{ x, rotateY }}
        className="h-full relative"
      >
        <div className="h-full p-6 rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 relative overflow-hidden">
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          />

          <div className="relative space-y-4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.frontmatter.tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="px-2.5 py-1 text-xs font-medium hover:bg-primary/20 transition-colors"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Badge>
              ))}
              {post.frontmatter.tags.length > 2 && (
                <Badge variant="secondary" className="px-2.5 py-1 text-xs">
                  +{post.frontmatter.tags.length - 2}
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-tight">
              {post.frontmatter.title}
            </h3>

            {/* Summary */}
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[4rem]">
              {post.frontmatter.summary}
            </p>

            {/* Meta Info */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(post.frontmatter.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTime}</span>
                </div>
              </div>
              
              {/* Arrow with animation */}
              <motion.div
                className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all"
              >
                <span className="text-sm hidden sm:inline">Read</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </div>

          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Featured indicator */}
          {post.frontmatter.featured && (
            <div className="absolute top-4 right-4">
              <Badge className="bg-primary text-primary-foreground shadow-lg">
                <Sparkles className="w-3 h-3" />
              </Badge>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
}