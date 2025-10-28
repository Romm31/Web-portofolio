"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image"; // <--- Import Image dari Next.js
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Tag, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/blog";

// Tipe datanya sekarang ada di sini
export interface BlogFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags?: string[];
  image?: string; // Pastikan ada properti 'image'
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  readingTime: string;
  frontmatter: BlogFrontmatter;
}

interface LatestPostsClientProps {
  posts: BlogPost[];
}

// Animasi untuk container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

// Animasi untuk tiap card
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function LatestPostsClient({ posts }: LatestPostsClientProps) {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
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
        <motion.div
          className="absolute bottom-1/4 -left-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 space-y-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span>Latest Writings</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
            From the{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Blog
            </span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Thoughts on cybersecurity, CTF writeups, and technical deep dives
          </p>
        </motion.div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-muted-foreground" />
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              No posts yet. Stay tuned!
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              Explore Blog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {posts.map((post) => (
              <motion.article
                key={post.slug}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className="group relative"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="h-full rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 relative overflow-hidden">
                    {/* Image (kalau ada) */}
                    {post.frontmatter.image && (
                      <div className="relative w-full h-48 overflow-hidden bg-muted">
                        <Image
                          src={post.frontmatter.image}
                          alt={post.frontmatter.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimalisasi gambar
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          priority={post.frontmatter.featured} // Load featured image lebih awal
                        />
                         {post.frontmatter.featured && (
                          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                            Featured
                          </div>
                        )}
                      </div>
                    )}

                    {/* Hover gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Content */}
                    <div className="relative p-6 sm:p-8 space-y-4"> {/* Padding dipindah ke sini */}
                      {/* Tags */}
                      {post.frontmatter.tags &&
                        post.frontmatter.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {/* Tambahan || [] untuk menghindari error jika tags undefined */}
                            {(post.frontmatter.tags || []).slice(0, 2).map((tag) => ( 
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="px-2.5 py-1 text-xs font-medium"
                              >
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                            {(post.frontmatter.tags || []).length > 2 && ( // cek lagi length nya
                              <Badge
                                variant="secondary"
                                className="px-2.5 py-1 text-xs"
                              >
                                +{(post.frontmatter.tags || []).length - 2}
                              </Badge>
                            )}
                          </div>
                        )}

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {post.frontmatter.title}
                      </h3>

                      {/* Summary */}
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                        {post.frontmatter.summary}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 text-xs sm:text-sm text-muted-foreground pt-4 border-t border-border/50">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(post.frontmatter.date)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{post.readingTime}</span>
                        </div>
                      </div>

                      {/* Read More Link */}
                      <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all pt-2">
                        <span className="text-sm sm:text-base">Read Article</span>
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>

                    {/* Featured badge (dipindah ke sini agar tidak tumpang tindih dengan gambar) */}
                    {!post.frontmatter.image && post.frontmatter.featured && ( // Tampilkan hanya jika tidak ada gambar
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary text-primary-foreground shadow-lg">
                          <Sparkles className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* View All Link */}
        {posts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all group"
              >
                <span>View All Posts</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}