import path from "path";
import { promises as fs } from "fs";

import { fetchPost } from "@/utils/fetchPost";
import { POSTS_FOLDER } from "@/utils/variables";

import { Discus } from "../_components";

import { type Locale, locales, t } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/discussion_page/en.json";
import PostCard from "@/components/PostCard";
import Image from "next/image";
import React from "react";

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

      return allDirNames.map(async (slug) => ({ params: { locale, slug } }));
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
  const { heading, sub_heading, rules } = await getDictionary<
    typeof dictionary
  >(locale, "discussion_page");

  return (
    <main>
      <div style={{ marginBottom: "5rem" }}>
        <h1>{t(heading, title)}</h1>

        <div style={{ display: "flex", gap: "15px" }}>
          <div style={{ maxWidth: "400px" }}>
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
          </div>

          <div>
            <p>{t(sub_heading)}</p>

            <ul>
              {rules.map((i, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: i }} />
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Discus
        title={title}
        locale={locale}
        id={scientificName}
        url={`https://aquajoy.club${url}/discussion`}
      />
    </main>
  );
}
