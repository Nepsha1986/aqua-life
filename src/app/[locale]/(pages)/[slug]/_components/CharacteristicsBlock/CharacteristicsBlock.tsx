import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFish,
  faSitemap,
  faRuler,
  faHourglassHalf,
  faSun,
  faMoon,
  faHandHoldingHeart,
  faShieldHalved,
  faEgg,
} from "@fortawesome/free-solid-svg-icons";

import InfoCard from "../InfoCard";
import { Locale, t } from "@/i18n";
import { Rate, ActivityTime } from "@/types";
import dictionary from "@/i18n/dictionaries/characteristics_block/en.json";
import { getDictionary } from "@/i18n/server/getDictionary";

interface Props {
  locale: Locale;
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

const CharacteristicsBlock = async ({
  locale,
  family,
  size,
  lifespan,
  activityTime,
  careLevel,
  behaviour,
  breedingDifficulty,
}: Props) => {
  const dict = await getDictionary<typeof dictionary>(
    locale,
    "characteristics_block",
  );

  return (
    <InfoCard.Container
      title={t(dict.characteristics)}
      icon={<FontAwesomeIcon icon={faFish} />}
    >
      <InfoCard.Item
        icon={<FontAwesomeIcon icon={faSitemap} />}
        term={t(dict.family)}
        def={family}
      />
      <InfoCard.Item
        icon={<FontAwesomeIcon icon={faRuler} />}
        term={t(dict.size)}
        def={`${size} ${t(dict.centimeters_short)}`}
      />
      <InfoCard.Item
        icon={<FontAwesomeIcon icon={faHourglassHalf} />}
        term={t(dict.lifespan)}
        def={`${lifespan} ${t(dict.years)}`}
      />
      <InfoCard.Item
        icon={
          <FontAwesomeIcon icon={activityTime === "night" ? faMoon : faSun} />
        }
        term={t(dict.activity_time)}
        def={activityTime}
      />
      <InfoCard.Item
        icon={<FontAwesomeIcon icon={faHandHoldingHeart} />}
        term={t(dict.care_level)}
        def={t(dict[difficultyMap[careLevel] as keyof typeof dictionary])}
        rate={careLevel}
      />
      <InfoCard.Item
        icon={<FontAwesomeIcon icon={faShieldHalved} />}
        term={t(dict.behaviour)}
        def={t(dict[behaviourMap[behaviour] as keyof typeof dictionary])}
        rate={behaviour}
      />
      <InfoCard.Item
        icon={<FontAwesomeIcon icon={faEgg} />}
        term={t(dict.breed_difficulty)}
        def={t(
          dict[difficultyMap[breedingDifficulty] as keyof typeof dictionary],
        )}
        rate={breedingDifficulty}
      />
    </InfoCard.Container>
  );
};

export default CharacteristicsBlock;
