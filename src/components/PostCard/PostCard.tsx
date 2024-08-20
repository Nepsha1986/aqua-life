import React from "react";
import Link from "next/link";

import styles from "./styles.module.scss";

interface Props {
  title: string;
  subTitle: string;
  excerpt: string;
  href: string;
  image: React.ReactNode;
}
const PostCard = ({ title, subTitle, excerpt, image, href }: Props) => {
  return (
    <Link className={styles.postCard} href={href}>
      <article className={styles.postCard__article}>
        <div className={styles.postCard__image}>{image}</div>

        <div className={styles.postCard__content}>
          <h1 className={styles.postCard__title}>{title}</h1>

          <p className={styles.postCard__subTitle}>{subTitle}</p>

          <p className={styles.postCard__excerpt}>{excerpt}</p>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
