import { t } from "@/i18n";

import styles from "./styles.module.scss";

interface Stat {
  value: string;
  label: string;
}

interface Props {
  stats: Stat[];
}

const HeroStats = ({ stats }: Props) => (
  <div className={styles.stats}>
    {stats.map(({ value, label }) => (
      <div key={value} className={styles.stats__item}>
        <span className={styles.stats__value}>{t(value)}</span>
        <span className={styles.stats__label}>{t(label)}</span>
      </div>
    ))}
  </div>
);

export default HeroStats;
