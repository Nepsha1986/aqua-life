import PostsList from "@/components/PostsList";
import { fetchPosts } from "@/utils/fetchPosts";
import { Language } from "@/i18n/languages";
import React from "react";

export default async function Home({ params }: { params: { lang: Language } }) {
  const { lang } = params;
  const posts = await fetchPosts(lang);

  return (
    <main>
      <h1>The catalog of all aquarium freshwater fishes</h1>
      <PostsList posts={posts} />
    </main>
  );
}
