import path from "path";
import { promises as fs } from "fs";
import Link from "next/link";

import { fetchPost } from "@/utils/fetchPost";
import { POSTS_FOLDER } from "@/utils/variables";

import {
  Discus
} from "../_components";

import { type Locale, locales, t } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/all/en.json";

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
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
  params: { locale: Locale; slug: string };
}) {
  const { locale, slug } = params;
  const {
    url,
    title,
  } = await fetchPost(locale, slug);

  return (
    <main>
      <h1>{title}. Обсуждение, предложения и комментарии.</h1>
      <p>Эта страница создана для того, чтобы каждый любитель аквариумистики мог внести свой вклад в развитие нашего сообщества. Здесь вы можете:</p>
      <ul>
        <li>
          Предложить изменения к статье <Link href={url} target='_blank'>{title}</Link>, если у вас есть дополнительная информация или замечания по содержанию.
        </li>
        <li>
          Поделиться фотографиями своих рыб, чтобы другие участники могли увидеть их в реальных условиях.
        </li>
        <li>
          Оставить полезные комментарии и рекомендации, делясь своим опытом и знаниями.
        </li>
      </ul>
      <Discus title={title} locale={locale} id={url} url={`https://aquajoy.club${url}`} />
    </main>
  );
}
