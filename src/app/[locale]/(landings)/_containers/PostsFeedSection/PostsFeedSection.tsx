import React from "react";
import Image from "next/image";
import Link from "next/link";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PostCard from "@/components/PostCard/PostCard";
import { PostPreview } from "@/types";
import { Locale, t } from "@/i18n";
import PostsFeed from "../PostsFeed";
import PostsGrid from "@/app/[locale]/(landings)/_components/PostsGrid";

import styles from "./styles.module.scss";
import { getPageDictionary } from "@/i18n/server/getPageDictionary";
import * as dict from "@/i18n/dictionaries/posts_feed_section/en.json";

interface Props {
  totalItems: number;
  itemsLoaded: number;
  posts: PostPreview[];
  locale: Locale;
}

const imgPlaceholderUrl = "/fish-img-not-found-placeholder.png";
export default async function PostsFeedSection({
  posts,
  totalItems,
  itemsLoaded,
  locale,
}: Props) {
  const dictionary = await getPageDictionary<typeof dict>(
    locale,
    "posts_feed_section",
  );

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
                {t(dictionary.read)}{" "}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </PostCard>
          </PostsGrid.Item>
        ))}
      </PostsGrid.Container>

      <PostsFeed
        totalItems={totalItems}
        itemsLoaded={itemsLoaded}
        dictionary={dictionary}
      />
    </div>
  );
}
