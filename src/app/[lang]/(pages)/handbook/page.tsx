import { fetchPosts } from "@/utils/fetchPosts";
import { Language } from "@/i18n/languages";
import PostsLinks from "@/components/PostsLinks";

export default async function Home({ params }: { params: { lang: Language } }) {
  const { lang } = params;
  const posts = await fetchPosts(lang, 0, 9999);

  return <PostsLinks posts={posts} />;
}
