import React from "react";
import Image from "next/image";

import PostCard from "@/components/PostCard/PostCard";
import { PostPreview } from "@/types";
import { Locale, t } from "@/i18n";
import PostsFeed from "../PostsFeed";
import PostsGrid from "@/app/[locale]/(landings)/_components/PostsGrid";

import { getDictionary } from "@/i18n/server/getDictionary";
import * as dict from "@/i18n/dictionaries/posts_feed_section/en.json";

import styles from "./styles.module.scss";

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
  const dictionary = await getDictionary<typeof dict>(
    locale,
    "posts_feed_section",
  );

  return (
    <div data-testid="posts_feed_section" className={styles.postsFeedSection}>
      <h1>Freshwater Fish</h1>

      <p>
        A comprehensive collection of articles about freshwater fish. Learn how
        to take care of popular freshwater fish like tetras, bettas, plecos, and
        gouramis. Also learn about what other aquatic species can coexist with
        freshwater fish in the same tank.
      </p>

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
              subTitle={`${post.scientificName}`}
              title={post.title}
              excerpt={post.excerpt}
              href={post.url}
            />
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
