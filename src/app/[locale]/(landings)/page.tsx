import React from "react";

import PostsFeedSection from "./_containers/PostsFeedSection";
import AboutSection from "./_containers/AboutSection";
import { fetchPosts } from "@/utils/fetchPosts";
import { type Locale } from "@/i18n";
import { type PostPreview } from "@/types";
import dictionary from "@/i18n/dictionaries/homepage_seo/en.json";
import Hero from "./_components/Hero";
import { getDictionary } from "@/i18n/server/getDictionary";

// Rotate the hero spotlight daily between species that have a photo
const pickSpotlight = (posts: PostPreview[]) => {
  const withImages = posts.filter((post) => post.imgUrl);
  const day = Math.floor(Date.now() / 86_400_000);

  return withImages[day % (withImages.length || 1)];
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  const { data, pagination } = await fetchPosts(locale, 0, 30);

  const featured = pickSpotlight(data);

  return (
    <>
      <Hero
        locale={locale}
        totalItems={pagination.totalItems}
        featured={featured}
      />

      <PostsFeedSection
        locale={locale}
        posts={data}
        totalItems={pagination.totalItems}
        itemsLoaded={data.length}
      />

      <AboutSection locale={locale} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const dict = await getDictionary<typeof dictionary>(locale, "homepage_seo");

  return {
    title: dict.title,
    description: dict.description,
  };
}
