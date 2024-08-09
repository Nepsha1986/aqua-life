import InfoCard from "../InfoCard";
import { t } from "@/i18n";
import { Rate, ActivityTime } from "@/types";

type DictKeys =
  | "characteristics"
  | "family"
  | "size"
  | "lifespan"
  | "centimeters_short"
  | "years"
  | "activity_time"
  | "care_level"
  | "behaviour"
  | "breed_difficulty"
  | "very_easy"
  | "easy"
  | "normal"
  | "hard"
  | "very_hard"
  | "very_peaceful"
  | "peaceful"
  | "neutral"
  | "aggressive"
  | "very_aggressive";

type CharacteristicsBlockDictionary = Record<DictKeys, string>;
interface Props {
  dict: CharacteristicsBlockDictionary;
  family: string;
  size: string;
  lifespan: string;
  activityTime: ActivityTime;
  careLevel: Rate;
  behaviour: Rate;
  breedingDifficulty: Rate;
}

const difficultyMap = {
  "1": "very_easy",
  "2": "easy",
  "3": "normal",
  "4": "hard",
  "5": "very_hard",
};

const behaviourMap = {
  "1": "very_peaceful",
  "2": "peaceful",
  "3": "neutral",
  "4": "aggressive",
  "5": "very_aggressive",
};

const CharacteristicsBlock = ({
  dict,
  family,
  size,
  lifespan,
  activityTime,
  careLevel,
  behaviour,
  breedingDifficulty,
}: Props) => {
  return (
    <InfoCard.Container title={t(dict.characteristics)}>
      <InfoCard.Item term={t(dict.family)} def={family} />
      <InfoCard.Item
        term={t(dict.size)}
        def={`${size} ${t(dict.centimeters_short)}`}
      />
      <InfoCard.Item
        term={t(dict.lifespan)}
        def={`${lifespan} ${t(dict.years)}`}
      />
      <InfoCard.Item term={t(dict.activity_time)} def={activityTime} />
      <InfoCard.Item
        term={t(dict.care_level)}
        def={t(dict[difficultyMap[careLevel] as DictKeys])}
      />
      <InfoCard.Item
        term={t(dict.behaviour)}
        def={t(dict[behaviourMap[behaviour] as DictKeys])}
      />
      <InfoCard.Item
        term={t(dict.breed_difficulty)}
        def={t(dict[difficultyMap[breedingDifficulty] as DictKeys])}
      />
    </InfoCard.Container>
  );
};

export default CharacteristicsBlock;
