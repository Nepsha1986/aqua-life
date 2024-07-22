// components/MDXPage.js

import { MDXRemote } from "next-mdx-remote/rsc";

import getContent from "@/utils/getContent";
import { Locale } from "@/i18n";

export default async function SimpleMDXPage({ params }: { locale: Locale }) {
  const { content } = await getContent(params.locale);

  return <MDXRemote source={content} />;
}

export async function generateMDXMetadata({ params }) {
  const { locale } = params;
  const { data } = await getContent(locale);

  return {
    title: data.title,
    description: data.description,
  };
}
