import InfoCard from "../InfoCard";
import { t } from "@/i18n";

type DictKeys =
  | "other_characteristics"
  | "activity_time"
  | "care_level"
  | "behaviour"
  | "breed_difficulty";

type CharacteristicsBlockDictionary = Record<DictKeys, string>;
type Rate = 1 | 2 | 3 | 4 | 5;

interface Props {
  dict: CharacteristicsBlockDictionary;
  activityTime: "day" | "night";
  careLevel: Rate;
  behaviour: Rate;
  breedingDifficulty: Rate;
}

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
      <InfoCard.Item term={t(dict.care_level)} def={careLevel} />
      <InfoCard.Item term={t(dict.behaviour)} def={behaviour} />
      <InfoCard.Item term={t(dict.breed_difficulty)} def={breedingDifficulty} />
    </InfoCard.Container>
  );
};

export default CharacteristicsBlock;
