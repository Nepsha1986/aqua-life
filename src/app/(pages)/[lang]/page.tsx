import PostsList from "@/_components/PostsList";
import { fetchPosts } from "@/utils/fetchPosts";

export default async function Home() {
  const lang = "en";
  const posts = await fetchPosts(lang);

  return <PostsList posts={posts} />;
}
