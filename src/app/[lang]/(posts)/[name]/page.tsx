import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { fetchPost } from "@/utils/fetchPost";
import fetchImage from "@/utils/fetchImage";

import styles from "./styles.module.css";

export default async function ContentPage({
  params,
}: {
  params: { lang: string; name: string };
}) {
  const { lang, name } = params;

  const img = await fetchImage(name);
  const { content, title } = await fetchPost(lang, name);

  return (
    <main>
      <article className={styles.article}>
        <div className={styles.article__imgWrap}>
          <Image
            className={styles.article__img}
            width={1200}
            height={600}
            src={img}
            alt={title}
          />
        </div>

        <div className={styles.article__contentWrap}>
          <h1>{title}</h1>
          <MDXRemote source={content} />
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
  const { frontmatter } = await fetchPost(lang, name);

  return {
    title: frontmatter?.title,
    description: frontmatter?.description,
  };
}
