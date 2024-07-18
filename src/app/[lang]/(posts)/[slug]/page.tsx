import path from "path";
import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

import { fetchPost } from "@/utils/fetchPost";
import { POSTS_FOLDER } from "@/utils/variables";
import InfoCard from "./_components/InfoCard";
import { Language, languages } from "@/i18n/languages";

import styles from "./styles.module.scss";

export async function generateMetadata({
  params,
}: {
  params: { lang: string; slug: string };
}) {
  const { lang, slug } = params;
  const { title, excerpt } = await fetchPost(lang, slug);

  return {
    title: title,
    description: excerpt,
  };
}

export async function generateStaticParams() {
  const allParams = await Promise.all(
    languages.map(async (lang) => {
      const contentDir = path.join(process.cwd(), POSTS_FOLDER, lang);
      const allFilenames = await fs.readdir(contentDir);

      return allFilenames.map(async (file) => {
        const slug = file.replace(".mdx", "");
        return { params: { lang, slug } };
      });
    }),
  );

  return allParams.flat();
}

export default async function ContentPage({
  params,
}: {
  params: { lang: Language; slug: string };
}) {
  const { lang, slug } = params;
  const { title, excerpt, imgUrl, content, traits, tankInfo } = await fetchPost(
    lang,
    slug,
  );

  return (
    <main>
      <article className={styles.article}>
        <div className={styles.article__contentWrap}>
          <h1>{title}</h1>

          <MDXRemote source={excerpt} />

          <Image
            className={styles.article__img}
            width={1200}
            height={600}
            src={imgUrl}
            alt={title}
          />

          <MDXRemote source={content} />
        </div>

        <div className={styles.article__meta}>
          {traits && (
            <InfoCard.Container title="Characteristics">
              <InfoCard.Item
                term="Scientific Name"
                def={traits.scientificName}
              />
              <InfoCard.Item term="Family" def={traits.family} />
              <InfoCard.Item term="Size" def={traits.size} />
              <InfoCard.Item term="Lifespan" def={traits.lifespan} />
              <InfoCard.Item term="Care Level" def={traits.careLevel} />
            </InfoCard.Container>
          )}

          {tankInfo && (
            <InfoCard.Container title="Tank Info">
              <InfoCard.Item term="Temperature" def={tankInfo.temperature} />
              <InfoCard.Item term="Min. Tank Size" def={tankInfo.volume} />
              <InfoCard.Item term="Water Hardness" def={tankInfo.hardness} />
              <InfoCard.Item term="Ph" def={tankInfo.phRange} />
              <InfoCard.Item term="Lighting" def={tankInfo.lighting} />
            </InfoCard.Container>
          )}
        </div>
      </article>
    </main>
  );
}
