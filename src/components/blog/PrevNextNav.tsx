// src/components/blog/PrevNextNav.tsx
"use client" 

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/mdx';

interface PrevNextNavProps {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function PrevNextNav({ prevPost, nextPost }: PrevNextNavProps) {
  return (
    <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Previous Post */}
      {prevPost ? (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`/blog/${prevPost.slug}`} className="group block h-full">
            <div className="h-full p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-start gap-3">
                <ArrowLeft className="w-5 h-5 text-primary mt-1 flex-shrink-0 group-hover:-translate-x-1 transition-transform" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Previous Post
                  </p>
                  <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {prevPost.frontmatter.title}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ) : (
        <div /> // Empty div for grid spacing
      )}

      {/* Next Post */}
      {nextPost ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Link href={`/blog/${nextPost.slug}`} className="group block h-full">
            <div className="h-full p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
              <div className="flex items-start gap-3 text-right">
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                    Next Post
                  </p>
                  <h3 className="font-bold group-hover:text-primary transition-colors line-clamp-2">
                    {nextPost.frontmatter.title}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-primary mt-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </motion.div>
      ) : (
        <div /> // Empty div for grid spacing
      )}
    </nav>
  );
}