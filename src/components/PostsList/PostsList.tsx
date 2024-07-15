import React from "react";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";

import fetchImage from "@/utils/fetchImage";
import PostCard from "@/components/PostCard/PostCard";
import { Post } from "@/types";
import Link from "next/link";

interface Props {
  posts: Post[];
}
export default function PostsList({ posts }: Props) {
  return (
    <div>
      <h1>Blog Posts</h1>

      <ul>
        {posts.map(async (post) => {
          const img = await fetchImage(post.slug);
          return (
            <li key={post.slug}>
              <PostCard
                slug={post.slug}
                image={<Image src={img} width={400} height={300} />}
                title={post.title}
              >
                <MDXRemote source={post.excerpt} />
                <Link href={post.url}>Link</Link>
              </PostCard>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
