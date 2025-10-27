"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Search, Tag } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { searchPosts } from "@/lib/blog";

interface BlogContentProps {
  allPosts: any[];
  allTags: { tag: string; count: number }[];
}

export default function BlogClient({ allPosts, allTags }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    let posts = allPosts;
    if (searchQuery) posts = searchPosts(posts, searchQuery);
    if (selectedTag)
      posts = posts.filter((post) =>
        post.frontmatter.tags
          .map((t: string) => t.toLowerCase())
          .includes(selectedTag.toLowerCase())
      );
    return posts;
  }, [allPosts, searchQuery, selectedTag]);

  const featuredPosts = allPosts.filter((post) => post.frontmatter.featured);

  return (
    <div className="container mx-auto px-4 pb-20">
      <section className="text-center max-w-3xl mx-auto mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4"
        >
          Blog & Notes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-lg text-muted-foreground mb-8"
        >
          Thoughts on cybersecurity, web development, and CTF writeups
        </motion.p>

        <div className="relative max-w-xl mx-auto mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base"
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedTag === null
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80"
            }`}
          >
            All Posts ({allPosts.length})
          </button>
          {allTags.slice(0, 6).map(({ tag, count }) => (
            <button
              key={tag}
              onClick={() =>
                setSelectedTag(selectedTag === tag ? null : tag)
              }
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1.5 ${
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80"
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              {tag} ({count})
            </button>
          ))}
        </div>
      </section>

      {!searchQuery && !selectedTag && featuredPosts.length > 0 && (
        <section className="pb-16">
          <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        </section>
      )}

      <section>
        {!searchQuery && !selectedTag && featuredPosts.length > 0 && (
          <h2 className="text-2xl font-bold mb-6 mt-8">All Posts</h2>
        )}

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.slug} post={post} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No posts found matching your search.
            </p>
          </motion.div>
        )}
      </section>
    </div>
  );
}
