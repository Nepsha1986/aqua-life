"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Post } from "@/types";
import VisibilityChecker from "@/components/VisibilityChecker";
import PostCard from "@/components/PostCard";
import { useLocale } from "@/i18n";

const imgPlaceholderUrl = "/fish-img-not-found-placeholder.png";
const PostsFeed = () => {
  const { locale } = useLocale();
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
    <div>
      <ul className='bulletfix'>
        {posts.map((i) => (
          <li key={i.slug} style={{ marginBottom: "10px" }}>
            <PostCard
              key={i.slug}
              title={i.title}
              image={
                <Image src={i.imgUrl ? i.imgUrl : imgPlaceholderUrl} width={320} height={240} alt={i.imgUrl ? i.title : 'placeholder'} />
              }
            >
              <p>{i.excerpt}</p>
              <Link href={i.url}>Link</Link>
            </PostCard>
          </li>
        ))}
      </ul>

      <VisibilityChecker
        onInView={() => {
          setPage((prevState) => prevState + 1);
        }}
      />
    </div>
  );
};

export default PostsFeed;
