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

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader post={post} />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24">
                <TableOfContents items={toc} />
              </div>
            </aside>

            <article className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="prose prose-slate dark:prose-invert max-w-none
                  prose-headings:font-bold prose-headings:tracking-tight
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-foreground/90 prose-p:leading-7
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-code:text-primary prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                  prose-pre:bg-muted/50 prose-pre:border prose-pre:border-border
                  prose-img:rounded-lg prose-img:shadow-lg
                  prose-blockquote:border-l-primary prose-blockquote:bg-muted/30
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-li:marker:text-primary
                  prose-table:border-collapse
                  prose-th:bg-muted prose-th:font-semibold
                  prose-td:border prose-td:border-border"
              >
                <MDXRemote {...mdxSource} components={MDXComponents} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-12 pt-8 border-t border-border"
              >
                <ShareButtons title={post.frontmatter.title} slug={post.slug} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8"
              >
                <AuthorCard author={post.frontmatter.author} />
              </motion.div>

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

            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-24 space-y-8">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                    Share Article
                  </h3>
                  <ShareButtons
                    title={post.frontmatter.title}
                    slug={post.slug}
                    layout="vertical"
                  />
                </div>

                {relatedPosts.length > 0 && (
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="font-bold text-sm uppercase tracking-wider mb-4 text-muted-foreground">
                      Related Posts
                    </h3>
                    <div className="space-y-3">
                      {relatedPosts.map((relatedPost) => (
                        <a
                          key={relatedPost.slug}
                          href={`/blog/${relatedPost.slug}`}
                          className="block group"
                        >
                          <p className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.frontmatter.title}
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>

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
    </div>
  );
}
