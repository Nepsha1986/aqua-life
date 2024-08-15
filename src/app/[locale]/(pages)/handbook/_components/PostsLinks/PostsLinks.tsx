import Link from "next/link";

import { PostPreview } from "@/types";
import { fetchPosts } from "@/utils/fetchPosts";
import { Locale } from "@/i18n";

import styles from "./styles.module.scss";

const PostsLinks = async ({ locale }: { locale: Locale }) => {
  const { data } = await fetchPosts(locale, 0, 9999);

  const groupedPosts = data.reduce(
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
                <li key={post.scientificName}>
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
