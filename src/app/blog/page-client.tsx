"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Tag, TrendingUp, Clock, X, Sparkles } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { searchPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/mdx";

interface BlogContentProps {
  allPosts: BlogPost[];
  allTags: { tag: string; count: number }[];
}

export default function BlogClient({ allPosts, allTags }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"all" | "featured" | "recent">("all");

  // Filter posts
  const filteredPosts = useMemo(() => {
    let posts = allPosts;

    // Filter by view mode
    if (viewMode === "featured") {
      posts = posts.filter((post) => post.frontmatter.featured);
    } else if (viewMode === "recent") {
      posts = posts.slice(0, 6);
    }

    // Filter by search
    if (searchQuery) {
      posts = searchPosts(posts, searchQuery);
    }

    // Filter by tag
    if (selectedTag) {
      posts = posts.filter((post) =>
        post.frontmatter.tags
          .map((t: string) => t.toLowerCase())
          .includes(selectedTag.toLowerCase())
      );
    }

    return posts;
  }, [allPosts, searchQuery, selectedTag, viewMode]);

  const featuredPosts = allPosts.filter((post) => post.frontmatter.featured);
  const recentPosts = allPosts.slice(0, 6);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTag(null);
  };

  return (
    <div className="container mx-auto px-4 pb-20">
      {/* Hero Section */}
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
          Blog & Notes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed"
        >
          Deep dives into cybersecurity, CTF writeups, and web development tricks
        </motion.p>

        {/* Search Bar */}
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

        {/* View Mode Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs
            value={viewMode}
            onValueChange={(v) => setViewMode(v as typeof viewMode)}
            className="w-full max-w-md mx-auto"
          >
            <TabsList className="grid w-full grid-cols-3 h-12">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="featured" className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span className="hidden sm:inline">Featured</span>
              </TabsTrigger>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span className="hidden sm:inline">Recent</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>
      </section>

      {/* Tags Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
            Filter by Tags
          </h3>
          {(selectedTag || searchQuery) && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary hover:underline flex items-center gap-1"
            >
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

      {/* Active Filters Display */}
      {(selectedTag || searchQuery) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-8 p-4 rounded-xl bg-muted/50 border border-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium">Active filters:</span>
              {searchQuery && (
                <Badge variant="outline" className="gap-2">
                  Search: "{searchQuery}"
                  <button onClick={() => setSearchQuery("")}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
              {selectedTag && (
                <Badge variant="outline" className="gap-2">
                  Tag: {selectedTag}
                  <button onClick={() => setSelectedTag(null)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              )}
            </div>
            <span className="text-sm text-muted-foreground">
              {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            </span>
          </div>
        </motion.div>
      )}

      {/* Posts Grid */}
      <section>
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
              <p className="text-muted-foreground mb-6">
                Try adjusting your search or filters
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Stats Footer */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-20 pt-12 border-t border-border"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-1">{allPosts.length}</div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">{featuredPosts.length}</div>
            <div className="text-sm text-muted-foreground">Featured</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">{allTags.length}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-1">{recentPosts.length}</div>
            <div className="text-sm text-muted-foreground">Recent</div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}