import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRuler,
  faTemperatureHalf,
  faDroplet,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";

import { Locale, t } from "@/i18n";
import { Post } from "@/types";
import { getDictionary } from "@/i18n/server/getDictionary";
import charDict from "@/i18n/dictionaries/characteristics_block/en.json";
import tankDict from "@/i18n/dictionaries/tank_info/en.json";

import styles from "./styles.module.scss";

interface Props {
  locale: Locale;
  traits: Post["traits"];
  tankInfo: Post["tankInfo"];
}

const QuickFacts = async ({ locale, traits, tankInfo }: Props) => {
  const [chars, tank] = await Promise.all([
    getDictionary<typeof charDict>(locale, "characteristics_block"),
    getDictionary<typeof tankDict>(locale, "tank_info"),
  ]);

  const facts = [
    {
      icon: faRuler,
      label: t(chars.size),
      value: traits?.size,
      unit: t(chars.centimeters_short),
    },
    {
      icon: faTemperatureHalf,
      label: t(tank.temperature),
      value: tankInfo?.temperature,
      unit: "°C",
    },
    {
      icon: faDroplet,
      label: t(tank.min_tank_size),
      value: tankInfo?.volume,
      unit: t(tank.litters),
    },
    {
      icon: faFlask,
      label: "pH",
      value: tankInfo?.ph,
      unit: "",
    },
  ].filter((fact) => !!fact.value);

  if (!facts.length) return null;

  return (
    <ul className={styles.quickFacts}>
      {facts.map((fact) => (
        <li key={fact.label} className={styles.quickFacts__item}>
          <span className={styles.quickFacts__icon}>
            <FontAwesomeIcon icon={fact.icon} />
          </span>
          <span className={styles.quickFacts__value}>
            {fact.value}
            {fact.unit && (
              <span className={styles.quickFacts__unit}> {fact.unit}</span>
            )}
          </span>
          <span className={styles.quickFacts__label}>{fact.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default QuickFacts;
