interface Post {
  title: string;
  excerpt: string;
  slug: string;
  content: string;
  url: string;
  imgUrl: string;
  tankInfo?: {
    temperature: string;
    volume: string;
    hardness: string;
    phRange: string;
    lighting: string;
  };
  traits?: {
    scientificName: string;
    family: string;
    size: string;
    lifespan: string;
    careLevel: string;
  };
}

type PostPreview = Omit<Post, "content" | "tankInfo" | "traits">;

export { type Post, type PostPreview };
