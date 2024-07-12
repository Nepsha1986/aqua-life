import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";

import { MetaData } from "./types";

async function fetchContent(params) {
  const { lang, name } = params;
  const contentDir = path.join(process.cwd(), "content", lang);
  const filePath = path.join(contentDir, `${name}.mdx`);

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

export default async function ContentPage({ params }) {
  const { fileContent, frontmatter } = await fetchContent(params);

  return (
    <div>
      {<h1>{frontmatter.title}</h1>}
      {<p>{frontmatter.description}</p>}

      <MDXRemote source={fileContent} />
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { frontmatter } = await fetchContent(params);

  return {
    title: frontmatter?.title,
    description: frontmatter?.description,
  };
}
