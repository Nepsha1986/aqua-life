import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { PostPreview } from "@/types";
import { Locale } from "@/i18n";
import fetchImage from "@/utils/fetchImage";

const MAX_SIZE = 50;

export async function fetchPosts(
  locale: Locale = "en",
  page = 0,
  size = MAX_SIZE,
): Promise<Awaited<PostPreview>[]> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER, locale);
  const allFilenames = await fs.readdir(contentDir);
  const minIndex = size * page;
  const maxIndex = minIndex + size;
  const filenames = allFilenames.slice(minIndex, maxIndex);

  return await Promise.all(
    filenames.map(async (filename, index) => {
      const filePath = path.join(contentDir, filename);
      const fileData = await fs.readFile(filePath, "utf8");
      const parsedContent = matter(fileData);

      const slug = filename.replace(".mdx", "");
      const postUrl = `/${locale}/${slug}`;

      const image = await fetchImage(slug);

      const postItem: PostPreview = {
        slug: filename.replace(".mdx", ""),
        title: parsedContent.data.title,
        url: postUrl,
        excerpt: parsedContent.data.excerpt,
        imgUrl: image === null ? "" : image.default.src,
      };

      return postItem;
    }),
  );
}
