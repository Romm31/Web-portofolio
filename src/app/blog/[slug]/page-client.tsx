"use client";

import { motion } from "framer-motion";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { MDXComponents } from "@/components/blog/MDXComponents";
import BlogHeader from "@/components/blog/BlogHeader";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
import AuthorCard from "@/components/blog/AuthorCard";
import RelatedPosts from "@/components/blog/RelatedPosts";
import PrevNextNav from "@/components/blog/PrevNextNav";
import type { BlogPost } from "@/lib/mdx";
import { generateTOC } from "@/lib/blog";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface BlogPostClientProps {
  post: BlogPost;
  mdxSource: MDXRemoteSerializeResult;
  relatedPosts: BlogPost[];
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function BlogPostClient({
  post,
  mdxSource,
  relatedPosts,
  prevPost,
  nextPost,
}: BlogPostClientProps) {
  const toc = generateTOC(post.content);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show/hide scroll to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background relative">
      <BlogHeader post={post} />

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Sidebar - TOC (Desktop Only) */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
                <TableOfContents items={toc} />
              </div>
            </aside>

            {/* Main Content */}
            <article className="lg:col-span-6">
              {/* MDX Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-slate dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 sm:prose-h2:mt-12 prose-h2:mb-4 sm:prose-h2:mb-6
                  prose-h3:text-xl sm:prose-h3:text-2xl prose-h3:mt-6 sm:prose-h3:mt-8 prose-h3:mb-3 sm:prose-h3:mb-4
                  prose-p:text-base prose-p:text-foreground/90 prose-p:leading-7
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                  prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border prose-pre:rounded-lg prose-pre:my-6
                  prose-img:rounded-lg prose-img:shadow-xl prose-img:my-8
                  prose-blockquote:border-l-4 prose-blockquote:border-l-primary prose-blockquote:bg-muted/30 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                  prose-ul:list-disc prose-ul:my-6 prose-ol:list-decimal prose-ol:my-6
                  prose-li:marker:text-primary prose-li:my-2
                  prose-table:border-collapse prose-table:my-8 prose-table:w-full
                  prose-th:bg-muted prose-th:font-semibold prose-th:p-3 prose-th:border prose-th:border-border
                  prose-td:border prose-td:border-border prose-td:p-3"
              >
                <MDXRemote {...mdxSource} components={MDXComponents} />
              </motion.div>

              {/* Share Buttons (Mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-border lg:hidden"
              >
                <h3 className="font-bold text-lg mb-4">Share This Article</h3>
                <ShareButtons title={post.frontmatter.title} slug={post.slug} />
              </motion.div>

              {/* Author Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12"
              >
                <AuthorCard author={post.frontmatter.author} />
              </motion.div>

              {/* Prev/Next Navigation */}
              {(prevPost || nextPost) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-12"
                >
                  <PrevNextNav prevPost={prevPost} nextPost={nextPost} />
                </motion.div>
              )}
            </article>

            {/* Right Sidebar (Desktop Only) */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto space-y-6">
                {/* Share Buttons */}
                <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                    Share Article
                  </h3>
                  <ShareButtons
                    title={post.frontmatter.title}
                    slug={post.slug}
                    layout="vertical"
                  />
                </div>

                {/* Related Posts Preview */}
                {relatedPosts.length > 0 && (
                  <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                      Related Posts
                    </h3>
                    <div className="space-y-4">
                      {relatedPosts.map((relatedPost) => (
                        <a
                          key={relatedPost.slug}
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                            {relatedPost.frontmatter.title}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {relatedPost.readingTime}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

          {/* Related Posts Section */}
          {relatedPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="mt-20"
            >
              <RelatedPosts posts={relatedPosts} />
            </motion.div>
          )}
        </div>
      </div>

      {/* Footer */}
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
                  <a
                    href="https://github.com/Romm31"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center border border-primary/20 hover:border-primary/40 transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/erwinwijaya"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-500/10 hover:bg-blue-500/20 flex items-center justify-center border border-blue-500/20 hover:border-blue-500/40 transition-all"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                  </a>
                  <a
                    href="mailto:contact@erwinwijaya.com"
                    className="w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500/20 flex items-center justify-center border border-red-500/20 hover:border-red-500/40 transition-all"
                  >
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

              {/* Newsletter (Optional) */}
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

      {/* Scroll to Top Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: showScrollTop ? 1 : 0,
          scale: showScrollTop ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <Button
          size="icon"
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all group"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </Button>
      </motion.div>
    </div>
  );
}