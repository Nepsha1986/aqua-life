import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { MetaData } from "@/types";

export async function fetchPosts(lang) {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER, lang);
  const filenames = await fs.readdir(contentDir);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(contentDir, filename);
      const fileData = await fs.readFile(filePath, "utf8");
      const parsedContent = matter(fileData);

      return {
        slug: filename.replace(".mdx", ""),
        ...parsedContent.data,
      };
    }),
  );

  return posts;
}
