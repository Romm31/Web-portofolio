import { format, parseISO } from 'date-fns';
import type { BlogPost } from './mdx';

// Format date
export function formatDate(date: string): string {
  return format(parseISO(date), 'MMMM dd, yyyy');
}

// Get featured posts
export function getFeaturedPosts(posts: BlogPost[]): BlogPost[] {
  return posts.filter((post) => post.frontmatter.featured);
}

// Search posts
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  const lowercaseQuery = query.toLowerCase();
  
  return posts.filter((post) => {
    const titleMatch = post.frontmatter.title.toLowerCase().includes(lowercaseQuery);
    const summaryMatch = post.frontmatter.summary.toLowerCase().includes(lowercaseQuery);
    const tagsMatch = post.frontmatter.tags.some((tag) =>
      tag.toLowerCase().includes(lowercaseQuery)
    );
    
    return titleMatch || summaryMatch || tagsMatch;
  });
}

// Get related posts (by tags)
export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] {
  const currentTags = currentPost.frontmatter.tags.map((t) => t.toLowerCase());
  
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      const matchingTags = post.frontmatter.tags.filter((tag) =>
        currentTags.includes(tag.toLowerCase())
      );
      return { post, matchCount: matchingTags.length };
    })
    .filter((item) => item.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount)
    .slice(0, limit)
    .map((item) => item.post);

  return relatedPosts;
}

// Generate table of contents from markdown content
export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function generateTOC(content: string): TocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    toc.push({ id, text, level });
  }

  return toc;
}