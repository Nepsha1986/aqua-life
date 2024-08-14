import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { PostPreview } from "@/types";
import { Locale } from "@/i18n";
import fetchImage from "@/utils/fetchImage";
import { Paginated } from "@/types/paginated";

const MAX_SIZE = 30;

export async function fetchPosts(
  locale: Locale = "en",
  page = 0,
  size = MAX_SIZE,
): Promise<Paginated<PostPreview>> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER);
  const allDirNames = await fs.readdir(contentDir);

  const start = page * size;
  const end = start + size;
  const dirNames = allDirNames.slice(start, end);

  const posts = await Promise.all(
    dirNames.map(async (dir) => {
      const filePath = path.join(contentDir, dir, `${locale}.mdx`);
      const metaPath = path.join(contentDir, dir, `_info.json`);
      const postUrl = `/${locale}/${dir}`;

      try {
        const [fileData, meta, image] = await Promise.all([
          fs.readFile(filePath, "utf8"),
          fs.readFile(metaPath, "utf8"),
          fetchImage(dir),
        ]);

        const parsedContent = matter(fileData);
        const metaData = JSON.parse(meta);

        return {
          slug: dir,
          scientificName: metaData.scientificName,
          title: parsedContent.data.title,
          url: postUrl,
          excerpt: parsedContent.data.excerpt,
          imgUrl: image?.default.src || "",
        } as PostPreview;
      } catch (error) {
        console.error(`Error fetching post data for ${dir}:`, error);
        return null;
      }
    }),
  );

  const validPosts = posts.filter(Boolean) as PostPreview[];

  return {
    data: validPosts,
    pagination: {
      totalItems: allDirNames.length,
      page,
      totalPages: Math.ceil(allDirNames.length / size),
      pageSize: size,
    },
  };
}
