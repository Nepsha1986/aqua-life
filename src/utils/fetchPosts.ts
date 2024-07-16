import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { Post } from "@/types";
import { Language } from "@/i18n/languages";

export async function fetchPosts(lang: Language): Promise<Awaited<Post>[]> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER, lang);
  const filenames = await fs.readdir(contentDir);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(contentDir, filename);
      const fileData = await fs.readFile(filePath, "utf8");
      const parsedContent = matter(fileData);

      const slug = filename.replace(".mdx", "");
      const postUrl = `/${lang}/${slug}`;

      return {
        slug: filename.replace(".mdx", ""),
        title: parsedContent.data.title,
        url: postUrl,
        excerpt: parsedContent.data.excerpt,
      } as Post;
    }),
  );

  return posts;
}
