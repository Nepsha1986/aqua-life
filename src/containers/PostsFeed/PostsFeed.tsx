"use client";

import React, { useEffect, useState } from "react";
import VisibilityChecker from "@/components/VisibilityChecker/VisibilityChecker";
import { Post } from "@/types";
import PostCard from "@/components/PostCard/PostCard";

const PostsFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await fetch(`/api/v1/posts?page=${page}`).then((data) =>
        data.json(),
      );
      setPosts([...posts, ...data]);
    };

    if (!!page) {
      void fetchPosts();
    }
  }, [page]);

  return (
    <div>
      <ul>
        {posts.map((i) => (
          <li key={i.slug} style={{ marginBottom: "10px" }}>
            <PostCard key={i.slug} title={i.title} image={<>placeholder</>}>
              {i.excerpt}
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
