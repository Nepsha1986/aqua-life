import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { PostPreview } from "@/types";
import { Locale } from "@/i18n";
import fetchImage from "@/utils/fetchImage";

const MAX_SIZE = 30;

export async function fetchPosts(
  locale: Locale = "en",
  page = 0,
  size = MAX_SIZE,
): Promise<Awaited<PostPreview>[]> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER);
  const allDirNames = await fs.readdir(contentDir);
  const minIndex = size * page;
  const maxIndex = minIndex + size;
  const dirNames = allDirNames.slice(minIndex, maxIndex);

  return await Promise.all(
    dirNames.map(async (dir, index) => {
      const filePath = path.join(contentDir, dir, `${locale}.mdx`);
      const fileData = await fs.readFile(filePath, "utf8");
      const parsedContent = matter(fileData);

      const postUrl = `/${locale}/${dir}`;

      const image = await fetchImage(dir);

      const postItem: PostPreview = {
        slug: dir,
        title: parsedContent.data.title,
        url: postUrl,
        excerpt: parsedContent.data.excerpt,
        imgUrl: image === null ? "" : image.default.src,
      };

      return postItem;
    }),
  );
}
