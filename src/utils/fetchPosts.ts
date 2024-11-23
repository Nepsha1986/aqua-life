import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { PostPreview } from "@/types";
import { Locale } from "@/i18n";
import fetchImage from "@/utils/fetchImage";
import { Paginated } from "@/types/paginated";

const MAX_SIZE = 30;

async function getPostData(
  dir: string,
  locale: Locale,
): Promise<PostPreview | null> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER);
  const filePath = path.join(contentDir, dir, `${locale}.mdx`);
  const metaPath = path.join(contentDir, dir, `_info.json`);
  const postUrl = `/${locale}/${dir.split("/")[1]}`;

  try {
    const [fileData, meta, image] = await Promise.all([
      fs.readFile(filePath, "utf8"),
      fs.readFile(metaPath, "utf8"),
      fetchImage(dir.split("/")[1]),
    ]);

    const parsedContent = matter(fileData);
    const metaData = JSON.parse(meta);

    return {
      slug: dir.split("/")[1],
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
}

export async function fetchPosts(
  locale: Locale = "en",
  page = 0,
  size = MAX_SIZE,
): Promise<Paginated<PostPreview>> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER);

  const allDirNames = await fs.readdir(contentDir);

  const dirNames = (
    await Promise.all(
      allDirNames.map(async (dir) => {
        const dirPath = path.join(contentDir, dir);
        const dirs = await fs.readdir(dirPath);

        return dirs.map((d) => path.join(dir, d));
      }),
    )
  ).flat();

  const start = page * size;
  const end = start + size;
  const pageDirNames = dirNames.slice(start, end);

  const posts = await Promise.all(
    pageDirNames.map((dir) => getPostData(dir, locale)),
  );

  const validPosts = posts.filter(Boolean) as PostPreview[];

  return {
    data: validPosts,
    pagination: {
      totalItems: dirNames.length,
      page,
      totalPages: Math.ceil(dirNames.length / size),
      pageSize: size,
    },
  };
}
