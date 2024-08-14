import { fetchPosts } from "@/utils/fetchPosts";
import { type Locale, type HandbookPageI18n } from "@/i18n";
import PostsLinks from "@/components/PostsLinks";
import { getPageDictionary } from "@/i18n/server/getPageDictionary";

const PAGE_NAME = "handbook";
export default async function Page({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const dict = await getPageDictionary<HandbookPageI18n>(locale, PAGE_NAME);

  const { data } = await fetchPosts(locale, 0, 9999);

  return (
    <>
      <h1>{dict.heading}</h1>
      <PostsLinks posts={data} />
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { locale: Locale };
}) {
  const { locale } = params;
  const dict = await getPageDictionary<HandbookPageI18n>(locale, PAGE_NAME);

  return {
    title: dict.seo.title,
    description: dict.seo.description,
  };
}
