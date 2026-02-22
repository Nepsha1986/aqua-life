const fs = require('fs').promises;
const path = require('path');

const BASE_URL = 'https://aquajoy.club';
const locales = ['en', 'ru'];
const staticPages = ['', '/about', '/handbook', '/terms-of-use'];
const POSTS_FOLDER = 'posts/content';

async function generateSitemap() {
    const now = new Date().toISOString();

    const staticEntries = locales.flatMap((locale) =>
        staticPages.map((page) => ({
            url: `${BASE_URL}/${locale}${page}`,
            lastModified: now,
            changeFrequency: page === '' ? 'daily' : 'monthly',
            priority: page === '' ? 1 : 0.5,
        })),
    );

    let slugs = [];
    try {
        const contentDir = path.resolve(__dirname, '..', POSTS_FOLDER);
        slugs = (await fs.readdir(contentDir)).filter((f) => !f.startsWith('.'));
    } catch (e) {
        console.error('Could not read posts folder:', e);
    }

    const postEntries = locales.flatMap((locale) =>
        slugs.map((slug) => ({
            url: `${BASE_URL}/${locale}/${slug}`,
            lastModified: now,
            changeFrequency: 'weekly',
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
        .join('\n')}
</urlset>`;

    const outPath = path.resolve(__dirname, '..', 'public', 'sitemap.xml');
    await fs.writeFile(outPath, xml, 'utf-8');
    console.log(`Sitemap generated with ${entries.length} URLs at ${outPath}`);
}

generateSitemap().catch((err) => {
    console.error('Error generating sitemap:', err);
    process.exit(1);
});
