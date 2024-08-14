import React from "react";

import PostsFeedSection from "./_containers/PostsFeedSection";
import { fetchPosts } from "@/utils/fetchPosts";
import { HomePageI18n, type Locale } from "@/i18n";
import Hero from "./_components/Hero";
import { getPageDictionary } from "@/i18n/server/getPageDictionary";
import { getDictionary } from "@/i18n/server/getDictionary";

export default async function Home({ params }: { params: { locale: Locale } }) {
  const { locale } = params;

  const dict = await getPageDictionary<HomePageI18n>(locale, "homepage");
  const { data, pagination } = await fetchPosts(locale, 0, 30);

  return (
    <>
      <Hero title={dict.hero.title} subTitle={dict.hero.sub_title} />

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
  const dict = await getPageDictionary<HomePageI18n>(locale, "homepage");

  return {
    title: dict.seo.title,
    description: dict.seo.description,
  };
}
