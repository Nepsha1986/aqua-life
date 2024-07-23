import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";

import { Locale } from "@/i18n";

const getContent = async (
  locale: Locale,
  page: string,
  fileName: string = "page",
) => {
  const contentPath = path.join(
    process.cwd(),
    `src/app/[locale]/(pages)/${page}/_content/${locale}`,
    `${fileName}.mdx`,
  );
  const fileData = await fs.readFile(contentPath, "utf8");
  const parsedContent = matter(fileData);

  const content = parsedContent.content;
  const data = parsedContent.data;

  return { content, data };
};

export default getContent;
