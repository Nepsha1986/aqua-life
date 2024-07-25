import { MDXRemote } from "next-mdx-remote/rsc";

import getContent from "@/utils/getContent";
import { Locale } from "@/i18n";

export default async function SimpleMDXPage({
  params,
  page,
}: {
  params: { locale: Locale };
  page: string;
}) {
  const { content } = await getContent(params.locale, page);

  return <MDXRemote source={content} />;
}

export async function generateMDXMetadata({
  params,
  page,
}: {
  params: { locale: Locale };
  page: string;
}) {
  const { locale } = params;
  const { data } = await getContent(locale, page);

  return {
    title: data.title,
    description: data.description,
  };
}
