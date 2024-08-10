"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { Post } from "@/types";
import VisibilityChecker from "@/components/VisibilityChecker";
import PostCard from "@/components/PostCard";
import { t, useLocale } from "@/i18n";
import PostsGrid from "@/app/[locale]/(landings)/_components/PostsGrid";

const imgPlaceholderUrl = "/fish-img-not-found-placeholder.png";
const PostsFeed = () => {
  const { locale, dictionary } = useLocale();
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetch(
        `/api/v1/posts?page=${page}&locale=${locale}`,
      ).then((data) => data.json());
      setPosts([...posts, ...data]);
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

      <VisibilityChecker
        onInView={() => {
          setPage((prevState) => prevState + 1);
        }}
      />
    </div>
  );
};

export default PostsFeed;
