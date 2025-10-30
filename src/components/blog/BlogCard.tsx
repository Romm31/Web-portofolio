import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
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
      className="group relative h-full"
    >
      <Link href={`/blog/${slug}`} className="block h-full">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="h-full relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
        >
          {/* Animated gradient overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            initial={false}
          />

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
          />

          {/* Image */}
          {frontmatter.image && (
            <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-muted">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                priority={frontmatter.featured}
              />
              
              {/* Dark gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Featured badge on image */}
              {frontmatter.featured && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-primary text-primary-foreground shadow-lg backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="relative p-6 space-y-4">
            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {frontmatter.tags.slice(0, 2).map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-2.5 py-1 text-xs font-medium hover:bg-primary/20 transition-colors"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
                {frontmatter.tags.length > 2 && (
                  <Badge
                    variant="secondary"
                    className="px-2.5 py-1 text-xs"
                  >
                    +{frontmatter.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}

            {/* Title */}
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight line-clamp-2 group-hover:text-primary transition-colors min-h-[3.5rem]">
              {frontmatter.title}
            </h3>

            {/* Summary */}
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {frontmatter.summary}
            </p>

            {/* Meta info */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{formatDate(frontmatter.date)}</span>
                  <span className="sm:hidden">
                    {new Date(frontmatter.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{readingTime}</span>
                </div>
              </div>

              {/* Read more arrow - animated */}
              <motion.div
                className="flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all"
              >
                <span className="text-xs sm:text-sm hidden sm:inline">Read</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </div>
          </div>

          {/* Corner decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Featured badge (if no image) */}
          {!frontmatter.image && frontmatter.featured && (
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-primary text-primary-foreground shadow-lg">
                <Sparkles className="w-3 h-3 mr-1" />
                Featured
              </Badge>
            </div>
          )}

          {/* Bottom glow effect */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </Link>
    </motion.article>
  );
}