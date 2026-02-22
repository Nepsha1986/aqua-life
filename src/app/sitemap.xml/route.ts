import { promises as fs } from "fs";
import path from "path";
import { POSTS_FOLDER } from "@/utils/variables";
import { locales } from "@/i18n";

const BASE_URL = "https://aquajoy.club";
const staticPages = ["", "/about", "/handbook", "/terms-of-use"];

export const dynamic = "force-static";

export async function GET() {
  const now = new Date().toISOString();

  const staticEntries = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${BASE_URL}/${locale}${page}`,
      lastModified: now,
      changeFrequency: page === "" ? "daily" : "monthly",
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
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })),
  );

  const entries = [...staticEntries, ...postEntries];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.url}</loc>
    <lastmod>${e.lastModified}</lastmod>
    <changefreq>${e.changeFrequency}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=86400, stale-while-revalidate",
    },
  });
}
