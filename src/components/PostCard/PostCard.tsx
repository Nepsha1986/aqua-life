import React from "react";

import styles from "./styles.module.css";

interface Props {
  title: string;
  image: React.ReactNode;
  children: React.ReactNode;
}
const PostCard = ({ title, image, children }: Props) => {
  return (
    <article className={styles.postCard}>
      <div className={styles.postCard__image}>{image}</div>

      <div>
        <h1 className={styles.postCard__title}>{title}</h1>

        <div className={styles.postCard__text}>{children}</div>
      </div>
    </article>
  );
};

export default PostCard;
