import React from "react";

import PostsList from "@/components/PostsList";
import { fetchPosts } from "@/utils/fetchPosts";
import { Locale } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import Hero from "./_components/Hero";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  const dict = await getDictionary(locale);
  const posts = await fetchPosts(locale);

  return (
    <main>
      <Hero
        title="Добро пожаловать на наш сайт!"
        subTitle="Здесь вы найдете все, что нужно знать о содержании, уходе и разведении
          аквариумных рыб. От уникальных видов до полезных советов – мы поможем
          вам создать идеальный подводный мир в вашем доме."
      />

      <div
        style={{
          maxWidth: "1300px",
          margin: "50px auto 50px",
          position: "relative",
        }}
      >
        <PostsList posts={posts} />
      </div>
    </main>
  );
}
