import Link from "next/link";

import { PostPreview } from "@/types";

import styles from "./styles.module.scss";

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
    <div className={styles.postsLinks}>
      {Object.keys(groupedPosts)
        .sort()
        .map((letter) => (
          <div key={letter}>
            <h2>{letter}</h2>

            <ul className={styles.postsLinks__list}>
              {groupedPosts[letter].map((post) => (
                <li key={post.title}>
                  <Link className={styles.postsLinks__listItem} href={post.url}>
                    {post.title} <span>({post.scientificName})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
};

export default PostsLinks;
