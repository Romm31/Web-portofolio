import { getAllBlogPosts } from "@/lib/mdx";
import LatestPostsClient from "@/components/home/LatestPostsClient";

export default async function LatestPostsSection() {
  const posts = getAllBlogPosts().slice(0, 4);
  return <LatestPostsClient posts={posts} />;
}