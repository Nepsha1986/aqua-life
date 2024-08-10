import React from "react";
import Image from "next/image";
import Link from "next/link";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PostCard from "@/components/PostCard/PostCard";
import { PostPreview } from "@/types";
import { t } from "@/i18n";
import PostsFeed from "../PostsFeed";
import PostsGrid from "@/app/[locale]/(landings)/_components/PostsGrid";

import styles from "./styles.module.scss";

type DictKeys = "read";

type PostsFeedSectionDictionary = Record<DictKeys, string>;

interface Props {
  dict: PostsFeedSectionDictionary;
  posts: PostPreview[];
}

const imgPlaceholderUrl = "/fish-img-not-found-placeholder.png";
export default function PostsFeedSection({ dict, posts }: Props) {
  return (
    <div data-testid="posts_feed_section" className={styles.postsFeedSection}>
      <PostsGrid.Container>
        {posts.map(async (post) => (
          <PostsGrid.Item key={post.slug}>
            <PostCard
              image={
                <Image
                  alt={post.imgUrl ? post.title : "placeholder"}
                  src={post.imgUrl ? post.imgUrl : imgPlaceholderUrl}
                  width={400}
                  height={300}
                />
              }
              title={post.title}
              excerpt={post.excerpt}
            >
              <Link href={post.url}>
                {t(dict.read)}{" "}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </PostCard>
          </PostsGrid.Item>
        ))}
      </PostsGrid.Container>

      <PostsFeed />
    </div>
  );
}
