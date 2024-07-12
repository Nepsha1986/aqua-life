import Link from "next/link";
export default function PostsList({ posts }) {
  return (
    <div>
      <h1>Blog Posts</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/en/${post.slug}`}>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
