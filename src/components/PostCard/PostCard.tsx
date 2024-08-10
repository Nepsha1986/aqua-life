import React from "react";

import styles from "./styles.module.scss";

interface Props {
  title: string;
  excerpt: string;
  image: React.ReactNode;
  children: React.ReactNode;
}
const PostCard = ({ title, excerpt, image, children }: Props) => {
  return (
    <article className={styles.postCard}>
      <div className={styles.postCard__image}>{image}</div>

      <div className={styles.postCard__content}>
        <h1 className={styles.postCard__title}>{title}</h1>

        <p className={styles.postCard__excerpt}>{excerpt}</p>

        <div>{children}</div>
      </div>
    </article>
  );
};

export default PostCard;
