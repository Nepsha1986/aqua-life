import path from "path";
import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

import { fetchPost } from "@/utils/fetchPost";
import { POSTS_FOLDER } from "@/utils/variables";

import {
  CharacteristicsBlock,
  TankInfoBlock,
  UnverifiedAlert,
} from "./_components";

import { type Locale, locales } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";

import styles from "./styles.module.scss";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const { seo } = await getDictionary(locale);
  const { title, excerpt } = await fetchPost(locale, slug);

  return {
    title: `${title}: ${seo.article_heading}`,
    description: excerpt,
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

export default async function ContentPage({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const {
    draft,
    title,
    excerpt,
    scientificName,
    imgUrl,
    content,
    traits,
    tankInfo,
  } = await fetchPost(locale, slug);

  const { tank_info_block, characteristics_block } =
    await getDictionary(locale);

  return (
    <main>
      <article className={styles.article}>
        <div className={styles.article__header}>
          <h1>
            {title}{" "}
            <span className={styles.article__scientificName}>
              ({scientificName})
            </span>
          </h1>
        </div>

        <div className={styles.article__imgWrap}>
          {imgUrl && (
            <Image
              className={styles.article__img}
              width={1200}
              height={600}
              src={imgUrl}
              alt={title}
            />
          )}
        </div>

        <div className={styles.article__meta}>
          <CharacteristicsBlock dict={characteristics_block} {...traits} />
          <TankInfoBlock dict={tank_info_block} {...tankInfo} />
        </div>

        <div className={styles.article__content}>
          <MDXRemote source={excerpt} />
          <MDXRemote source={content} />
        </div>

        <div data-nosnippet={true}>
          {draft && <UnverifiedAlert locale={locale} />}
        </div>
      </article>
    </main>
  );
}
