import { MDXRemote } from "next-mdx-remote/rsc";
import { fetchPost } from "@/utils/fetchPost";

export default async function ContentPage({
  params,
}: {
  params: { lang: string; name: string };
}) {
  const { lang, name } = params;
  const { fileContent, frontmatter } = await fetchPost(lang, name);

  return (
    <div>
      {<h1>{frontmatter.title}</h1>}
      {<p>{frontmatter.description}</p>}

      <MDXRemote source={fileContent} />
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: { lang: string; name: string };
}) {
  const { lang, name } = params;
  const { frontmatter } = await fetchPost(lang, name);

  return {
    title: frontmatter?.title,
    description: frontmatter?.description,
  };
}
