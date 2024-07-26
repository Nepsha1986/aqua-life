import InfoCard from "../InfoCard";
import { t } from "@/i18n";

type DictKeys =
  | "other_characteristics"
  | "activity_time"
  | "care_level"
  | "behaviour"
  | "breed_difficulty"
  | "very_easy"
  | "easy"
  | "normal"
  | "hard"
  | "very_hard";

type CharacteristicsBlockDictionary = Record<DictKeys, string>;
type Rate = 1 | 2 | 3 | 4 | 5;

interface Props {
  dict: CharacteristicsBlockDictionary;
  activityTime: "day" | "night";
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
  activityTime,
  careLevel,
  behaviour,
  breedingDifficulty,
}: Props) => {
  return (
    <InfoCard.Container title={t(dict.other_characteristics)}>
      <InfoCard.Item term={t(dict.activity_time)} def={activityTime} />
      <InfoCard.Item
        term={t(dict.care_level)}
        def={t(dict[difficultyMap[careLevel]])}
      />
      <InfoCard.Item
        term={t(dict.behaviour)}
        def={t(dict[behaviourMap[behaviour]])}
      />
      <InfoCard.Item
        term={t(dict.breed_difficulty)}
        def={t(dict[difficultyMap[breedingDifficulty]])}
      />
    </InfoCard.Container>
  );
};

export default CharacteristicsBlock;
