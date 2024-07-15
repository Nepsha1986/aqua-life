import PostsList from "@/components/PostsList";
import { fetchPosts } from "@/utils/fetchPosts";
import { Language } from "@/i18n/languages";

export default async function Home({ params }: { params: { lang: Language } }) {
  const { lang } = params;
  const posts = await fetchPosts(lang);

  console.log(posts);

  return <PostsList posts={posts} />;
}
