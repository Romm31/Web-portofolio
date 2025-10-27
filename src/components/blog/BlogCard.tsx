import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/blog';
import type { BlogPost } from '@/lib/mdx';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const { slug, frontmatter, readingTime } = post;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Link href={`/blog/${slug}`}>
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
          {/* Image */}
          {frontmatter.image && (
            <div className="relative w-full h-48 overflow-hidden bg-muted">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {frontmatter.featured && (
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                  Featured
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {frontmatter.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {frontmatter.title}
            </h3>

            {/* Summary */}
            <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-2">
              {frontmatter.summary}
            </p>

            {/* Meta info */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{formatDate(frontmatter.date)}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{readingTime}</span>
                </div>
              </div>

              {/* Read more arrow */}
              <div className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                <span className="text-xs">Read more</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}