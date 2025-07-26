import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXProvider } from "@mdx-js/react";

import getContent from "@/utils/getContent";
import { Locale } from "@/i18n";

export default async function SimpleMDXPage({
  params,
  page,
  components,
}: {
  params: Promise<{ locale: Locale }>;
  page: string;
  components: React.ComponentProps<typeof MDXProvider>["components"];
}) {
  const { locale } = await params;
  const { content } = await getContent(locale, page);

  return <MDXRemote source={content} components={components} />;
}

export async function generateMDXMetadata({
  params,
  page,
}: {
  params: Promise<{ locale: Locale }>;
  page: string;
}) {
  const { locale } = await params;
  const { data } = await getContent(locale, page);

  return {
    title: data.title,
    description: data.description,
  };
}
