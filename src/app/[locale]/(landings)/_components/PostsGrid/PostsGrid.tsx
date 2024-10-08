import React from "react";

import styles from "./styles.module.scss";

const PostsGridItem = ({ children }: { children: React.ReactNode }) => {
  return <li className={styles.postsGrid__item}>{children}</li>;
};
const PostsGridContainer = ({ children }: { children: React.ReactNode }) => {
  return <ul className={styles.postsGrid}>{children}</ul>;
};

const PostsGrid: {
  Container: typeof PostsGridContainer;
  Item: typeof PostsGridItem;
} = {
  Container: PostsGridContainer,
  Item: PostsGridItem,
};

export default PostsGrid;
