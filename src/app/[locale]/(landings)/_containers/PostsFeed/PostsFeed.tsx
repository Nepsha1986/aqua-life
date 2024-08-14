"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { Post } from "@/types";
import PostCard from "@/components/PostCard";
import { t, useLocale } from "@/i18n";
import PostsGrid from "@/app/[locale]/(landings)/_components/PostsGrid";
import { Button } from "@/ui";

const imgPlaceholderUrl = "/fish-img-not-found-placeholder.png";

interface Props {
  totalItems: number;
  itemsLoaded: number;
}
const PostsFeed = ({ totalItems, itemsLoaded }: Props) => {
  const { locale, dictionary } = useLocale();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);
  const [postsLoaded, setPostsLoaded] = useState(itemsLoaded);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await fetch(
        `/api/v1/posts?page=${page}&locale=${locale}`,
      ).then((res) => res.json());
      setPosts([...posts, ...data]);

      setPostsLoaded((prev) => prev + data.length);
    };

    if (!!page) {
      void fetchPosts();
    }
  }, [page]);

  return (
    <div style={{ paddingTop: "2rem" }}>
      <PostsGrid.Container>
        {posts.map((i) => (
          <PostsGrid.Item key={i.slug}>
            <PostCard
              title={i.title}
              excerpt={i.excerpt}
              image={
                <Image
                  src={i.imgUrl ? i.imgUrl : imgPlaceholderUrl}
                  width={400}
                  height={300}
                  alt={i.imgUrl ? i.title : "placeholder"}
                />
              }
            >
              <Link href={i.url}>
                {t(dictionary.common.read)}{" "}
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
              </Link>
            </PostCard>
          </PostsGrid.Item>
        ))}
      </PostsGrid.Container>

      <div
        style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        <div>
          <p>
            Displaying {postsLoaded} out of {totalItems} fish profiles
          </p>

          {postsLoaded < totalItems && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                size="lg"
                color="primary"
                onClick={() => {
                  setPage((prevState) => prevState + 1);
                }}
              >
                Show More
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostsFeed;
