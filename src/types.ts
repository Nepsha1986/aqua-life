interface Post {
  title: string;
  excerpt: string;
  slug: string;
  content: string;
  url: string;
  imgUrl: string;
}

type PostPreview = Omit<Post, "content">;

export { type Post, type PostPreview };
