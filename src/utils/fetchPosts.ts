import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { Post } from "@/types";
import { Language } from "@/i18n/languages";
import fetchImage from "@/utils/fetchImage";

const MAX_SIZE = 3;

export async function fetchPosts(
  lang: Language = "en",
  page = 0,
  size = MAX_SIZE,
): Promise<Awaited<Post>[]> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER, lang);
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
      const postUrl = `/${lang}/${slug}`;

      const image = await fetchImage(slug);

      console.log(image);

      return {
        slug: filename.replace(".mdx", ""),
        title: parsedContent.data.title,
        url: postUrl,
        excerpt: parsedContent.data.excerpt,
        imgUrl: image.default.src,
      } as Post;
    }),
  );
}
