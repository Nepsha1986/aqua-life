import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { fetchPost } from "@/utils/fetchPost";

import InfoCard from "./_components/InfoCard";

import styles from "./styles.module.css";

export default async function ContentPage({
  params,
}: {
  params: { lang: string; name: string };
}) {
  const { lang, name } = params;

  const { content, title, imgUrl, excerpt, tankInfo, traits } = await fetchPost(
    lang,
    name,
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

export async function generateMetadata({
  params,
}: {
  params: { lang: string; name: string };
}) {
  const { lang, name } = params;
  const { title, excerpt } = await fetchPost(lang, name);

  return {
    title: title,
    description: excerpt,
  };
}
