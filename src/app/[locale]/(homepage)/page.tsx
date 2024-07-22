import React from "react";

import PostsList from "@/components/PostsList";
import { fetchPosts } from "@/utils/fetchPosts";
import { Locale } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import Hero from "./_components/Hero";
import { getPageContent } from "@/i18n/server/getPageContent";
import { HomePageI18n } from "@/i18n";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  const dict = await getPageContent<HomePageI18n>(locale, "homepage");
  const posts = await fetchPosts(locale);

  return (
    <main>
      <Hero title={dict.hero.title} subTitle={dict.hero.sub_title} />

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
