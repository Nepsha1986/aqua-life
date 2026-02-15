import { LinkBtn } from "@/ui";
import { Locale, t } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/hero/en.json";
import HeroStats from "./_components/HeroStats";

import styles from "./styles.module.scss";

interface Props {
  locale: Locale;
}
const Hero = async ({ locale }: Props) => {
  const dict = await getDictionary<typeof dictionary>(locale, "hero");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg} />

      <svg
        className={styles.hero__waveBottom}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,56 C360,0 720,120 1080,56 C1260,24 1380,40 1440,48 L1440,120 L0,120 Z" />
      </svg>

      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>{t(dict.title)}</h1>
        <p className={styles.hero__subTitle}>{t(dict.sub_title)}</p>

        <LinkBtn
          size="lg"
          className={styles.hero__btn}
          href={`${locale}/handbook`}
          color="secondary"
        >
          {t(dict.btn)}
        </LinkBtn>

        <HeroStats
          stats={[
            { value: dict.stat_species, label: dict.stat_species_desc },
            { value: dict.stat_guides, label: dict.stat_guides_desc },
            { value: dict.stat_community, label: dict.stat_community_desc },
          ]}
        />
      </div>
    </section>
  );
};

export default Hero;
