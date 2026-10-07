import path from "path";
import { promises as fs } from "fs";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

import { fetchPost } from "@/utils/fetchPost";
import { POSTS_FOLDER } from "@/utils/variables";

import {
  CharacteristicsBlock,
  UnverifiedAlert,
  ImproveArticleBlock,
  TankInfoBlock,
  QuickFacts,
} from "./_components";
import Breadcrumbs from "@/components/Breadcrumbs";

import { type Locale, locales, t } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/all/en.json";

import styles from "./styles.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const { seo } = await getDictionary<typeof dictionary>(locale, "all");
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
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const {
    url,
    draft,
    title,
    scientificName,
    family,
    aliases,
    excerpt,
    imgUrl,
    content,
    traits,
    tankInfo,
  } = await fetchPost(locale, slug);

  const { common, nav } = await getDictionary<typeof dictionary>(locale, "all");

  return (
    <article className={styles.article}>
      <Breadcrumbs
        items={[
          { label: t(nav.homepage), href: `/${locale}` },
          { label: t(nav.handbook), href: `/${locale}/handbook` },
          { label: title },
        ]}
      />

      <header className={styles.article__header}>
        <div className={styles.article__imgWrap}>
          <Image
            className={styles.article__img}
            width={1200}
            height={900}
            src={imgUrl || "/fish-img-not-found-placeholder.png"}
            alt={title}
            priority
          />
        </div>

        <div className={styles.article__intro}>
          {family && <span className={styles.article__family}>{family}</span>}

          <h1 className={styles.article__title}>{title}</h1>
          <p className={styles.article__scientificName}>{scientificName}</p>

          {!!aliases.length && (
            <div className={styles.article__aliases}>
              <span className={styles.article__aliasesLabel}>
                {t(common.common_names)}:
              </span>
              {aliases.map((alias) => (
                <span key={alias} className={styles.article__alias}>
                  {alias}
                </span>
              ))}
            </div>
          )}

          <div className={styles.article__lead}>
            <MDXRemote source={excerpt} />
          </div>

          <QuickFacts locale={locale} traits={traits} tankInfo={tankInfo} />
        </div>
      </header>

      <div className={styles.article__body}>
        <div className={`${styles.article__content} prose`}>
          <MDXRemote source={content} />

          <div data-nosnippet={true} className={styles.article__footer}>
            {draft ? (
              <UnverifiedAlert
                locale={locale}
                discussionLink={`${url}/discussion`}
              />
            ) : (
              <ImproveArticleBlock link={`${url}/discussion`} locale={locale} />
            )}
          </div>
        </div>

        <aside className={styles.article__aside}>
          <div className={styles.article__sticky}>
            <CharacteristicsBlock locale={locale} family={family} {...traits} />
            <TankInfoBlock locale={locale} {...tankInfo} />
          </div>
        </aside>
      </div>
    </article>
  );
}
