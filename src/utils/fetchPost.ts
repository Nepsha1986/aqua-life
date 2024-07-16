import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { Post } from "@/types";
import fetchImage from "@/utils/fetchImage";

export async function fetchPost(lang: string, slug: string): Promise<Post> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER, lang);
  const filePath = path.join(contentDir, `${slug}.mdx`);
  const postUrl = `/${lang}/${slug}`;

  try {
    const fileData = await fs.readFile(filePath, "utf8");
    const parsedContent = matter(fileData);

    const image = await fetchImage(slug);

    const post: Post = {
      slug: slug,
      title: parsedContent.data.title,
      url: postUrl,
      excerpt: parsedContent.data.excerpt,
      imgUrl: image.default.src,
      content: parsedContent.content,
    };

    return post;
  } catch (e) {
    notFound();
  }
}
