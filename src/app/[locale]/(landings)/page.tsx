import React from "react";

import PostsList from "@/components/PostsList";
import { fetchPosts } from "@/utils/fetchPosts";
import { HomePageI18n, type Locale } from "@/i18n";
import Hero from "./_components/Hero";
import { getPageContent } from "@/i18n/server/getPageContent";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  const dict = await getPageContent<HomePageI18n>(locale, "homepage");
  const posts = await fetchPosts(locale);

  return (
    <>
      <Hero title={dict.hero.title} subTitle={dict.hero.sub_title} />

      <PostsList posts={posts} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = await getPageContent<HomePageI18n>(locale, "homepage");

  return {
    title: dict.seo.title,
    description: dict.seo.description,
  };
}
