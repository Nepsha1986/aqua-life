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

  const posts = await Promise.all(
    dirNames.map(async (dir) => {
      try {
        const filePath = path.join(contentDir, dir, `${locale}.mdx`);
        const charsPath = path.join(contentDir, dir, `_info.json`);
        const postUrl = `/${locale}/${dir}`;

        const [fileData, meta, image] = await Promise.all([
          fs.readFile(filePath, "utf8"),
          fs.readFile(charsPath, "utf8"),
          fetchImage(dir)
        ]);

        const metaData = JSON.parse(meta);
        const parsedContent = matter(fileData);

        const postItem: PostPreview = {
          slug: dir,
          scientificName: metaData.scientificName,
          title: parsedContent.data.title,
          url: postUrl,
          excerpt: parsedContent.data.excerpt,
          imgUrl: image === null ? "" : image.default.src,
        };

        return postItem;
      } catch (e) {
        console.error('Error while fetching posts data:', e);
        return null;
      }
    })
  );

  return posts.filter((post): post is PostPreview => post !== null);
}
