// src/app/blog/[slug]/page.tsx
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getAllBlogSlugs,
  serializeMDX,
  getAllBlogPosts,
} from "@/lib/mdx";
import { getRelatedPosts } from "@/lib/blog";
import BlogPostClient from "./page-client";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: any,
  _parent?: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = (await props.params) || props.params || {}; // ✅ handle both Promise/object
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: `${post.frontmatter.title} | Erwin Wijaya`,
    description: post.frontmatter.summary,
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      type: "article",
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.author || "Erwin Wijaya"],
      tags: post.frontmatter.tags,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      images: post.frontmatter.image ? [post.frontmatter.image] : [],
    },
  };
}

export default async function BlogPostPage(props: any) {
  // 🔧 Handle either Promise or direct params
  const resolvedParams = (await props.params) || props.params;
  const { slug } = resolvedParams || {};

  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const mdxSource = await serializeMDX(post.content);
  const allPosts = getAllBlogPosts();
  const relatedPosts = getRelatedPosts(post, allPosts, 3);

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost =
    currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost =
    currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <BlogPostClient
      post={post}
      mdxSource={mdxSource}
      relatedPosts={relatedPosts}
      prevPost={prevPost}
      nextPost={nextPost}
    />
  );
}
