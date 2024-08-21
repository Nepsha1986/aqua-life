import React from "react";

import PostsFeedSection from "./_containers/PostsFeedSection";
import { fetchPosts } from "@/utils/fetchPosts";
import { type Locale } from "@/i18n";
import dictionary from "@/i18n/dictionaries/homepage_seo/en.json";
import Hero from "./_components/Hero";
import { getDictionary } from "@/i18n/server/getDictionary";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  const { data, pagination } = await fetchPosts(locale, 0, 30);

  return (
    <>
      <Hero locale={locale} />

      <PostsFeedSection
        locale={locale}
        posts={data}
        totalItems={pagination.totalItems}
        itemsLoaded={data.length}
      />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = await getDictionary<typeof dictionary>(locale, "homepage_seo");

  return {
    title: dict.title,
    description: dict.description,
  };
}
