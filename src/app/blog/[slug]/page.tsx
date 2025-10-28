// src/app/blog/[slug]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getBlogPostBySlug,
  getAllBlogSlugs,
  serializeMDX,
  getAllBlogPosts,
} from "@/lib/mdx";
import { getRelatedPosts } from "@/lib/blog";
import BlogPostClient from "./page-client";


interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug: string) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { slug } = params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
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

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = params;
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
