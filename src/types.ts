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
    gh: string;
    ph: string;
  };
  traits?: {
    scientificName: string;
    aliases: string[];
    family: string;
    size: string;
    lifespan: string;
  };
  char?: {
    activityTime: "day" | "night";
    careLevel: number;
    behaviour: number;
    breedingDifficulty: number;
  };
}

type PostPreview = Omit<Post, "content" | "tankInfo" | "traits" | "char">;

export { type Post, type PostPreview };
