import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { Post } from "@/types";

export async function fetchPost(lang: string, slug: string): Promise<Post> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER, lang);
  const filePath = path.join(contentDir, `${slug}.mdx`);

  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const parsedContent = matter(fileData);

    return {
      title: parsedContent.data.title,
      excerpt: parsedContent.data.excerpt,
      content: parsedContent.content,
    } as Post;
  } catch (e) {
    notFound();
  }
}
