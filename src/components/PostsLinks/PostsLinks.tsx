import { PostPreview } from "@/types";
import Link from "next/link";

const PostsLinks = ({ posts }: { posts: PostPreview[] }) => {
  const groupedPosts = posts.reduce(
    (acc, post) => {
      const firstLetter = post.title[0].toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(post);
      return acc;
    },
    {} as Record<string, PostPreview[]>,
  );

  return (
    <div>
      {Object.keys(groupedPosts)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <h2>{letter}</h2>
            <ul>
              {groupedPosts[letter].map((post) => (
                <li key={post.title}>
                  <Link href={post.url}>{post.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

      <h2>Overall: {posts.length}</h2>
    </div>
  );
};

export default PostsLinks;
