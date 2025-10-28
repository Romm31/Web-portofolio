import HomeClient from "./HomeClient";
import LatestPostsSection from "@/sections/LatestPostsSection";

export default function Page() {
  const postsSection = <LatestPostsSection />;

  return (
    <HomeClient latestPosts={postsSection} />
  );
}

