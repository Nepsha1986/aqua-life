import { fetchPosts } from "@/utils/fetchPosts";
import { Locale } from "@/i18n";
import PostsLinks from "@/components/PostsLinks";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const posts = await fetchPosts(locale, 0, 9999);

  return <PostsLinks posts={posts} />;
}
