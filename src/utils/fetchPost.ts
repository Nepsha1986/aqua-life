import { promises as fs } from "fs";
import { notFound } from "next/navigation";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { Post } from "@/types";
import fetchImage from "@/utils/fetchImage";

export async function fetchPost(locale: string, slug: string): Promise<Post> {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER, slug);
  const filePath = path.join(contentDir, `${locale}.mdx`);
  const charsPath = path.join(contentDir, `_info.json`);
  const url = `/${locale}/${slug}`;

  try {
    const [fileData, meta, image] = await Promise.all([
      fs.readFile(filePath, "utf8"),
      fs.readFile(charsPath, "utf8"),
      fetchImage(slug),
    ]);

    const metaData = JSON.parse(meta);
    const parsedContent = matter(fileData);

    const { title, excerpt, aliases, draft } = parsedContent.data;
    const { scientificName, tankInfo, traits } = metaData;

    const post: Post = {
      draft,
      aliases,
      slug,
      url,
      content: parsedContent.content,
      imgUrl: image === null ? "" : image.default.src,
      title,
      excerpt,
      scientificName,
      tankInfo,
      traits,
    };

    return post;
  } catch (e) {
    notFound();
  }
}
