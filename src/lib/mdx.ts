// src/lib/mdx.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import readingTime from "reading-time";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypePrism from "rehype-prism-plus";
import rehypeCodeTitles from "rehype-code-titles";

const BLOG_PATH = path.join(process.cwd(), "src/content/blog");

export interface BlogFrontmatter {
  title: string;
  date: string;
  tags: string[];
  summary: string;
  image?: string;
  author?: string;
  draft?: boolean;
  featured?: boolean;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
  readingTime: string;
}


export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_PATH)) return [];

  return fs
    .readdirSync(BLOG_PATH)
    .filter((dir) => {
      const fullPath = path.join(BLOG_PATH, dir, "blog.mdx");
      return fs.existsSync(fullPath);
    });
}


export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const filePath = path.join(BLOG_PATH, slug, "blog.mdx"); 
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const readTime = readingTime(content);

    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
      readingTime: readTime.text,
    };
  } catch (error) {
    console.error(`Error reading blog post: ${slug}`, error);
    return null;
  }
}


export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs
    .map((slug) => getBlogPostBySlug(slug))
    .filter((post): post is BlogPost => post !== null)
    .filter((post) => !post.frontmatter.draft)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );

  return posts;
}


export function getPostsByTag(tag: string): BlogPost[] {
  const allPosts = getAllBlogPosts();
  return allPosts.filter((post) =>
    post.frontmatter.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase())
  );
}


export function getAllTags(): { tag: string; count: number }[] {
  const allPosts = getAllBlogPosts();
  const tagCount: Record<string, number> = {};

  allPosts.forEach((post) => {
    post.frontmatter.tags.forEach((tag) => {
      const normalizedTag = tag.toLowerCase();
      tagCount[normalizedTag] = (tagCount[normalizedTag] || 0) + 1;
    });
  });

  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}


export async function serializeMDX(content: string) {
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeCodeTitles, rehypePrism, rehypeKatex],
    },
  });

  return mdxSource;
}
