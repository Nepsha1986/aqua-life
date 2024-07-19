import PostsList from "@/components/PostsList";
import { fetchPosts } from "@/utils/fetchPosts";
import { Locale } from "@/i18n/locales";
import React from "react";
import { getDictionary } from "@/i18n/server/getDictionary";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  const dict = await getDictionary(locale);
  const posts = await fetchPosts(locale);

  return (
    <main>
      <h1>Homepage</h1>
      <PostsList posts={posts} />
    </main>
  );
}
