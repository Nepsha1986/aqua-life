import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";

import PostCard from "@/components/PostCard/PostCard";
import { PostPreview } from "@/types";
import PostsFeed from "@/containers/PostsFeed";

import styles from './styles.module.scss'

interface Props {
  posts: PostPreview[];
}

const imgPlaceholderUrl = "/fish-img-not-found-placeholder.png";
export default function PostsList({ posts }: Props) {
  return (
    <div className={styles.postsFeedSection}>
      <ul className="bulletfix">
        {posts.map(async (post) => {
          return (
            <li key={post.slug} style={{ marginBottom: "10px" }}>
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
