import path from "path";
import { promises as fs } from "fs";
import type { MetadataRoute } from "next";

import { locales } from "@/i18n";
import { POSTS_FOLDER, SITE_URL } from "@/utils/variables";

const staticPages = ["", "/about", "/handbook", "/terms-of-use"];

const entry = (
  pagePath: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number,
): MetadataRoute.Sitemap =>
  locales.map((locale) => ({
    url: `${SITE_URL}/${locale}${pagePath}`,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${SITE_URL}/${l}${pagePath}`]),
      ),
    },
  }));

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER);
  const slugs = (await fs.readdir(contentDir)).filter(
    (name) => !name.startsWith("."),
  );

  return [
    ...staticPages.flatMap((page) =>
      entry(page, page === "" ? "daily" : "monthly", page === "" ? 1 : 0.5),
    ),
    ...slugs.flatMap((slug) => entry(`/${slug}`, "weekly", 0.8)),
  ];
}
