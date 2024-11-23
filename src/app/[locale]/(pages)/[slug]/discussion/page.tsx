import React from "react";
import Image from "next/image";
import path from "path";
import { promises as fs } from "fs";

import { fetchPost } from "@/utils/fetchPost";
import { POSTS_FOLDER } from "@/utils/variables";

import Discus from "./_components/Discus";
import DiscussionPageLayout from "./_components/DiscussionPageLayout";

import { type Locale, locales, t } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/discussion_page/en.json";
import PostCard from "@/components/PostCard";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const { seo_title, seo_description } = await getDictionary<typeof dictionary>(
    locale,
    "discussion_page",
  );
  const { title } = await fetchPost(locale, slug);

  return {
    title: t(seo_title, title),
    description: t(seo_description, title),
  };
}

export async function generateStaticParams() {
  const allParams = await Promise.all(
    locales.map(async (locale) => {
      const contentDir = path.join(process.cwd(), POSTS_FOLDER);
      const allDirNames = await fs.readdir(contentDir);

      return allDirNames.map(async (slug) => ({
        params: { locale, slug },
      }));
    }),
  );

  return allParams.flat();
}

export default async function DiscussionPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const { url, title, imgUrl, scientificName, excerpt } = await fetchPost(
    locale,
    slug,
  );
  const { heading, sub_heading, rules, rules_heading } = await getDictionary<
    typeof dictionary
  >(locale, "discussion_page");

  return (
    <main>
      <DiscussionPageLayout
        header={
          <>
            <h1>{t(heading, title)}</h1>
          </>
        }
        card={
          <PostCard
            title={title}
            href={url}
            image={
              <Image
                alt={imgUrl ? title : "placeholder"}
                src={imgUrl ? imgUrl : ""}
                width={400}
                height={300}
              />
            }
            subTitle={scientificName}
            excerpt={excerpt}
          />
        }
        rules={
          <>
            <p>{t(sub_heading)}</p>
            <h3>{t(rules_heading)}</h3>
            <ul>
              {rules.map((i, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: t(i) }} />
              ))}
            </ul>
          </>
        }
      >
        <Discus
          title={title}
          locale={locale}
          id={scientificName}
          url={`https://aquajoy.club${url}/discussion`}
        />
      </DiscussionPageLayout>
    </main>
  );
}
