import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

import fetchImage from "@/utils/fetchImage";
import PostCard from "@/components/PostCard/PostCard";
import { PostPreview } from "@/types";
import PostsFeed from "@/containers/PostsFeed";

interface Props {
  posts: PostPreview[];
}
export default function PostsList({ posts }: Props) {
  return (
    <div>
      <ul>
        {posts.map(async (post) => {
          const img = await fetchImage(post.slug);
          return (
            <li key={post.slug} style={{ marginBottom: "10px" }}>
              <PostCard
                image={
                  <Image alt={post.title} src={img} width={400} height={300} />
                }
                title={post.title}
              >
                <MDXRemote source={post.excerpt} />
                <Link href={post.url}>Link</Link>
              </PostCard>
            </li>
          );
        })}
      </ul>

      <PostsFeed />
    </div>
  );
}
