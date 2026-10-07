import Link from "next/link";
import Image from "next/image";

import { PostPreview } from "@/types";
import { fetchPosts } from "@/utils/fetchPosts";
import { Locale } from "@/i18n";

import styles from "./styles.module.scss";

const imgPlaceholderUrl = "/fish-img-not-found-placeholder.png";

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

  const letters = Object.keys(groupedPosts).sort((a, b) =>
    a.localeCompare(b, locale),
  );

  return (
    <div className={styles.postsLinks}>
      <nav className={styles.postsLinks__alphabet} aria-label="A–Z">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#letter-${letter}`}
            className={styles.postsLinks__alphabetItem}
          >
            {letter}
          </a>
        ))}
      </nav>

      {letters.map((letter) => (
        <section
          key={letter}
          id={`letter-${letter}`}
          className={styles.postsLinks__group}
        >
          <h2 className={styles.postsLinks__letter}>
            {letter}
            <span className={styles.postsLinks__count}>
              {groupedPosts[letter].length}
            </span>
          </h2>

          <ul className={styles.postsLinks__list}>
            {groupedPosts[letter]
              .sort((a, b) => a.title.localeCompare(b.title, locale))
              .map((post) => (
                <li key={post.slug} className={styles.postsLinks__item}>
                  <Link className={styles.postsLinks__link} href={post.url}>
                    <span className={styles.postsLinks__thumb}>
                      <Image
                        src={post.imgUrl || imgPlaceholderUrl}
                        alt=""
                        width={96}
                        height={72}
                      />
                    </span>
                    <span className={styles.postsLinks__text}>
                      <span className={styles.postsLinks__title}>
                        {post.title}
                      </span>
                      <span className={styles.postsLinks__latin}>
                        {post.scientificName}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  );
};

export default PostsLinks;
