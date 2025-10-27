import { Navbar } from "@/components/blog/navbar";
import { getAllBlogPosts, getAllTags } from "@/lib/mdx";
import BlogClient from "./page-client"; // 👉 client component terpisah

export default async function BlogPage() {
  const allPosts = await getAllBlogPosts();
  const allTags = await getAllTags();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <BlogClient allPosts={allPosts} allTags={allTags} />
      </main>
    </>
  );
}
