"use server";

import { promises as fs } from "fs";
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

// ✅ get all slugs
export async function getAllBlogSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(BLOG_PATH);
    return files.filter(f => f.endsWith(".mdx")).map(f => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

// ✅ get single post
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOG_PATH, `${slug}.mdx`);
    const fileContents = await fs.readFile(filePath, "utf8");
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

// ✅ get all posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const slugs = await getAllBlogSlugs();
  const posts = await Promise.all(slugs.map(s => getBlogPostBySlug(s)));
  return posts
    .filter((p): p is BlogPost => p !== null)
    .filter(p => !p.frontmatter.draft)
    .sort((a, b) =>
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );
}

// ✅ get posts by tag
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter(p =>
    p.frontmatter.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

// ✅ get all tags
export async function getAllTags(): Promise<{ tag: string; count: number }[]> {
  const allPosts = await getAllBlogPosts();
  const tagCount: Record<string, number> = {};
  allPosts.forEach(post => {
    post.frontmatter.tags.forEach(tag => {
      const t = tag.toLowerCase();
      tagCount[t] = (tagCount[t] || 0) + 1;
    });
  });
  return Object.entries(tagCount)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

// ✅ serialize markdown
export async function serializeMDX(content: string) {
  return await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkMath],
      rehypePlugins: [rehypeCodeTitles, rehypePrism, rehypeKatex],
    },
  });
}
