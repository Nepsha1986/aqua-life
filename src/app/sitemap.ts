import type { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";
import { POSTS_FOLDER } from "@/utils/variables";
import { locales } from "@/i18n";

const BASE_URL = "https://aquajoy.club";
const staticPages = ["", "/about", "/handbook", "/terms-of-use"];

export const dynamic = "force-static";
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? ("daily" as const) : ("monthly" as const),
      priority: page === "" ? 1 : 0.5,
    })),
  );

  let slugs: string[] = [];
  try {
    const contentDir = path.join(process.cwd(), POSTS_FOLDER);
    slugs = (await fs.readdir(contentDir)).filter((f) => !f.startsWith("."));
  } catch (e) {
    console.error("Could not read posts folder:", e);
  }

  const postEntries = locales.flatMap((locale) =>
    slugs.map((slug) => ({
      url: `${BASE_URL}/${locale}/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  );

  return [...staticEntries, ...postEntries];
}
