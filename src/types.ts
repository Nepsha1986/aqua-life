export type Rate = 1 | 2 | 3 | 4 | 5;
export type ActivityTime = "day" | "night";

interface Post {
  draft?: boolean;
  title: string;
  scientificName: string;
  family: string;
  aliases: string[];
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
    activityTime: ActivityTime;
    careLevel: Rate;
    behaviour: Rate;
    breedingDifficulty: Rate;
    size: string;
    lifespan: string;
  };
}

type PostPreview = Omit<
  Post,
  "content" | "tankInfo" | "traits" | "draft" | "aliases" | "family"
>;

export { type Post, type PostPreview };
