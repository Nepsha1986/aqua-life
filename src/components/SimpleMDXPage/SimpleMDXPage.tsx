import React from "react";
import classNames from "classnames";
import { MDXRemote } from "next-mdx-remote/rsc";
import { MDXProvider } from "@mdx-js/react";

import getContent from "@/utils/getContent";
import { Locale } from "@/i18n";

import styles from "./styles.module.scss";

export default async function SimpleMDXPage({
  params,
  page,
  components,
  wide = false,
}: {
  params: Promise<{ locale: Locale }>;
  page: string;
  components?: React.ComponentProps<typeof MDXProvider>["components"];
  wide?: boolean;
}) {
  const { locale } = await params;
  const { content } = await getContent(locale, page);

  return (
    <div
      className={classNames("prose", styles.page, {
        [styles.page_wide]: wide,
      })}
    >
      <MDXRemote source={content} components={components} />
    </div>
  );
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
