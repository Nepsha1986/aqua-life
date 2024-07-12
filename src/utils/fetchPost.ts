import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

import { POSTS_FOLDER } from "@/utils/variables";
import { MetaData } from "@/types";

export async function fetchPost(lang: string, slug: string) {
  const contentDir = path.join(process.cwd(), POSTS_FOLDER, lang);
  const filePath = path.join(contentDir, `${slug}.mdx`);

  let fileContent = "";
  let frontmatter: MetaData = { title: "", description: "" };

  try {
    console.log(`Trying to read file: ${filePath}`);
    const fileData = await fs.readFile(filePath, "utf8");
    const parsedContent = matter(fileData);
    fileContent = parsedContent.content;
    frontmatter = parsedContent.data as MetaData;
  } catch (e) {
    console.error(`Error reading file: ${e.message}`);
    fileContent = "# Error\nContent not found.";
    frontmatter = { title: "Error", description: "Content not found" };
  }

  return { fileContent, frontmatter };
}
