// src/app/blog/page.tsx
import { Navbar } from "@/components/blog/navbar";
import { getAllBlogPosts, getAllTags } from "@/lib/mdx";
import BlogClient from "./page-client";

export const metadata = {
  title: "Blog | Erwin Wijaya",
  description: "Deep dives into cybersecurity, CTF writeups, and web development tricks",
};

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const allTags = getAllTags();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-32 pb-20">
        <BlogClient allPosts={allPosts} allTags={allTags} />
      </main>
    </>
  );
}