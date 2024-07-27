export type Rate = 1 | 2 | 3 | 4 | 5;
export type ActivityTime = "day" | "night";

interface Post {
  title: string;
  excerpt: string;
  slug: string;
  content: string;
  url: string;
  imgUrl: string;
  tankInfo: {
    temperature: string;
    volume: string;
    gh: string;
    ph: string;
  };
  traits: {
    scientificName: string;
    aliases: string[];
    family: string;
    size: string;
    lifespan: string;
  };
  char: {
    activityTime: ActivityTime;
    careLevel: Rate;
    behaviour: Rate;
    breedingDifficulty: Rate;
  };
}

type PostPreview = Omit<Post, "content" | "tankInfo" | "traits" | "char">;

export { type Post, type PostPreview };
