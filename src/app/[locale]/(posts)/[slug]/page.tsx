import path from "path";
import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

import { fetchPost } from "@/utils/fetchPost";
import { POSTS_FOLDER } from "@/utils/variables";
import InfoCard from "./_components/InfoCard";
import { type Locale, locales } from "@/i18n";

import styles from "./styles.module.scss";
import { connectStats } from "instantsearch.js/es/connectors";
import { getDictionary } from "@/i18n/server/getDictionary";

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
      const contentDir = path.join(process.cwd(), POSTS_FOLDER, locale);
      const allFilenames = await fs.readdir(contentDir);

      return allFilenames.map(async (file) => {
        const slug = file.replace(".mdx", "");
        return { params: { locale, slug } };
      });
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
  const { title, excerpt, imgUrl, content, traits, tankInfo, char } =
    await fetchPost(locale, slug);

  const dict = await getDictionary(locale);

  return (
    <main>
      <article className={styles.article}>
        <div className={styles.article__contentWrap}>
          <h1>{title}</h1>

          <MDXRemote source={excerpt} />

          {imgUrl && (
            <Image
              className={styles.article__img}
              width={1200}
              height={600}
              src={imgUrl}
              alt={title}
            />
          )}

          <MDXRemote source={content} />
        </div>

        <div className={styles.article__meta}>
          {traits && (
            <InfoCard.Container title="Characteristics">
              <InfoCard.Item
                term="Scientific Name"
                def={traits.scientificName}
              />
              <InfoCard.Item
                term="Common names"
                def={traits.aliases.join(", ")}
              />
              <InfoCard.Item term="Family" def={traits.family} />
              <InfoCard.Item term="Size" def={traits.size} />
              <InfoCard.Item term="Lifespan" def={traits.lifespan} />
            </InfoCard.Container>
          )}

          {tankInfo && (
            <InfoCard.Container title="Tank Info">
              <InfoCard.Item term="Temperature" def={tankInfo.temperature} />
              <InfoCard.Item term="Min. Tank Size" def={tankInfo.volume} />
              <InfoCard.Item term="Water Hardness" def={tankInfo.gh} />
              <InfoCard.Item term="Ph" def={tankInfo.ph} />
            </InfoCard.Container>
          )}

          {char && (
            <InfoCard.Container title="Other Characteristics">
              <InfoCard.Item term="Activity Time" def={char.activityTime} />
              <InfoCard.Item term="Care Level" def={char.careLevel} />
              <InfoCard.Item term="Behaviour" def={char.behaviour} />
              <InfoCard.Item
                term="Breed Difficulty"
                def={char.breedingDifficulty}
              />
            </InfoCard.Container>
          )}
        </div>
      </article>
    </main>
  );
}
