"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Tag, TrendingUp, Clock, X, Sparkles, Github, Linkedin, Mail, Heart } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { searchPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/mdx";
import Link from "next/link";

interface BlogContentProps {
  allPosts: BlogPost[];
  allTags: { tag: string; count: number }[];
}

export default function BlogClient({ allPosts, allTags }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"all" | "featured" | "recent">("all");

  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    if (viewMode === "featured") posts = posts.filter((p) => p.frontmatter.featured);
    else if (viewMode === "recent") posts = posts.slice(0, 6);
    if (searchQuery) posts = searchPosts(posts, searchQuery);
    if (selectedTag)
      posts = posts.filter((p) =>
        p.frontmatter.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
      );
    return posts;
  }, [allPosts, searchQuery, selectedTag, viewMode]);

  const featuredPosts = allPosts.filter((p) => p.frontmatter.featured);
  const recentPosts = allPosts.slice(0, 6);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="container mx-auto px-4 pb-20 flex-1">
        {/* ====== HERO ====== */}
        <section className="text-center max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>{allPosts.length} Articles & Counting</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent"
          >
            Blogs
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed"
          >
            Deep dives into cybersecurity, CTF writeups, and web development tricks.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-2xl mx-auto mb-8"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search articles by title, tags, or content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-10 h-14 text-base rounded-xl border-2 focus:border-primary transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-muted transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as typeof viewMode)} className="w-full max-w-md mx-auto">
              <TabsList className="grid w-full grid-cols-3 h-12">
                <TabsTrigger value="all"><Tag className="w-4 h-4 mr-1" />All</TabsTrigger>
                <TabsTrigger value="featured"><TrendingUp className="w-4 h-4 mr-1" />Featured</TabsTrigger>
                <TabsTrigger value="recent"><Clock className="w-4 h-4 mr-1" />Recent</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </section>

        {/* ====== TAG FILTER ====== */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Filter by Tags</h3>
            {(selectedTag || searchQuery) && (
              <button onClick={clearFilters} className="text-sm text-primary hover:underline flex items-center gap-1">
                <X className="w-3 h-3" />
                Clear filters
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            <AnimatePresence mode="popLayout">
              {allTags.map(({ tag, count }, index) => (
                <motion.button
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2, delay: index * 0.03 }}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Badge
                    variant={selectedTag === tag ? "default" : "secondary"}
                    className="px-4 py-2 text-sm cursor-pointer transition-all hover:shadow-md"
                  >
                    <Tag className="w-3 h-3 mr-1.5" />
                    {tag}
                    <span className="ml-1.5 opacity-70">({count})</span>
                  </Badge>
                </motion.button>
              ))}
            </AnimatePresence>
          </div>
        </motion.section>

        {/* ====== POSTS ====== */}
        <AnimatePresence mode="wait">
          {filteredPosts.length > 0 ? (
            <motion.div
              key="posts-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredPosts.map((post, index) => (
                <BlogCard key={post.slug} post={post} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-posts"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-2">No posts found</h3>
              <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
              <button onClick={clearFilters} className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====== STATS ====== */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 pt-12 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div><div className="text-3xl font-bold mb-1">{allPosts.length}</div><div className="text-sm text-muted-foreground">Total Posts</div></div>
            <div><div className="text-3xl font-bold mb-1">{featuredPosts.length}</div><div className="text-sm text-muted-foreground">Featured</div></div>
            <div><div className="text-3xl font-bold mb-1">{allTags.length}</div><div className="text-sm text-muted-foreground">Categories</div></div>
            <div><div className="text-3xl font-bold mb-1">{recentPosts.length}</div><div className="text-sm text-muted-foreground">Recent</div></div>
          </div>
        </motion.section>
      </div>

      {/* ====== FOOTER ====== */}
      <footer className="relative w-full border-t border-border/40 bg-gradient-to-b from-background/95 to-background backdrop-blur-xl pt-16 pb-8 mt-20">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h4 className="text-xl font-black tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Erwin Wijaya
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Cyber Security Enthusiast & CTF Player. Passionate about web security and sharing knowledge.
                </p>
                <div className="flex gap-3 pt-2">
                  <a href="https://github.com/Romm31" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-all">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href="https://linkedin.com/in/erwinwijaya" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center border border-blue-500/20 hover:border-blue-500/40 transition-all">
                    <Linkedin className="w-4 h-4 text-blue-600" />
                  </a>
                  <a href="mailto:contact@erwinwijaya.com"
                    className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center border border-red-500/20 hover:border-red-500/40 transition-all">
                    <Mail className="w-4 h-4 text-red-500" />
                  </a>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold tracking-tight">Quick Links</h4>
                <ul className="space-y-3">
                  {[
                    { href: "/", label: "Home" },
                    { href: "/blog", label: "Blog" },
                    { href: "/#projects", label: "Projects" },
                    { href: "/#contact", label: "Contact" },
                  ].map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold tracking-tight">Categories</h4>
                <ul className="space-y-3">
                  {["Cybersecurity", "CTF", "Web Dev", "Linux"].map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/blog`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <h4 className="text-lg font-bold tracking-tight">Stay Updated</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified about new posts and updates.
                </p>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                  View All Posts
                </Link>
              </motion.div>
            </div>

            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <span>© {new Date().getFullYear()} Erwin Wijaya.</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">
                  Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> and ☕
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <Link href="/" className="hover:text-primary transition-colors">Privacy</Link>
                <span>•</span>
                <Link href="/" className="hover:text-primary transition-colors">Terms</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </footer>
    </div>
  );
}
