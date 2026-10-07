import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCodeBranch,
  faUsers,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { LinkBtn } from "@/ui";
import { Locale, t } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/about_section/en.json";

import styles from "./styles.module.scss";

interface Props {
  locale: Locale;
}

const features = [
  { key: "catalog", icon: faBook },
  { key: "opensource", icon: faCodeBranch },
  { key: "community", icon: faUsers },
] as const;

const AboutSection = async ({ locale }: Props) => {
  const dict = await getDictionary<typeof dictionary>(locale, "about_section");

  return (
    <section className={styles.about}>
      <div className={styles.about__glow} aria-hidden="true" />

      <div className={styles.about__container}>
        <div className={styles.about__top}>
          <span className={styles.about__eyebrow}>Aqua Life</span>
          <h2 className={styles.about__heading}>{t(dict.heading)}</h2>
          <p className={styles.about__intro}>{t(dict.intro)}</p>
        </div>

        <div className={styles.about__features}>
          {features.map(({ key, icon }, index) => (
            <div key={key} className={styles.feature}>
              <span className={styles.feature__index}>0{index + 1}</span>
              <div className={styles.feature__icon}>
                <FontAwesomeIcon icon={icon} />
              </div>
              <h3 className={styles.feature__title}>
                {t(dict[`feature_${key}_title` as keyof typeof dict])}
              </h3>
              <p className={styles.feature__desc}>
                {t(dict[`feature_${key}_desc` as keyof typeof dict])}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.about__cta}>
          <LinkBtn href={`/${locale}/about`} color="primary">
            {t(dict.btn)}
            <FontAwesomeIcon icon={faArrowRight} />
          </LinkBtn>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
