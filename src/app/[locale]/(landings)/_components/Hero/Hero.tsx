import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faBookOpen,
  faRuler,
  faTemperatureHalf,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";

import { LinkBtn } from "@/ui";
import { FishGlyph } from "@/components/Logo";
import { Locale, t } from "@/i18n";
import { PostPreview } from "@/types";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/hero/en.json";
import HeroStats from "./_components/HeroStats";

import styles from "./styles.module.scss";

interface Props {
  locale: Locale;
  totalItems: number;
  featured?: PostPreview;
}

// Deterministic pseudo-random values so server and client render the same.
const bubbles = Array.from({ length: 18 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 4 + ((i * 7) % 14),
  duration: 9 + ((i * 5) % 11),
  delay: -((i * 13) % 17),
}));

const Hero = async ({ locale, totalItems, featured }: Props) => {
  const dict = await getDictionary<typeof dictionary>(locale, "hero");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__scene} aria-hidden="true">
        <div className={styles.hero__photo} />
        <div className={styles.hero__rays} />
        <div className={styles.hero__caustics} />

        <div className={styles.hero__school}>
          <FishGlyph className={styles.fish} />
          <FishGlyph className={styles.fish} />
          <FishGlyph className={styles.fish} />
          <FishGlyph className={styles.fish} />
        </div>

        <div className={styles.hero__bubbles}>
          {bubbles.map((b, i) => (
            <span
              key={i}
              className={styles.bubble}
              style={
                {
                  "--left": `${b.left}%`,
                  "--size": `${b.size}px`,
                  "--duration": `${b.duration}s`,
                  "--delay": `${b.delay}s`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className={styles.hero__content}>
        <div className={styles.hero__text}>
          <span className={styles.hero__eyebrow}>
            <span className={styles.hero__pulse} />
            {t(dict.eyebrow)}
          </span>

          <h1 className={styles.hero__title}>
            {t(dict.title_lead)}{" "}
            <span className={styles.hero__titleAccent}>
              {t(dict.title_accent)}
            </span>
          </h1>

          <p className={styles.hero__subTitle}>{t(dict.sub_title)}</p>

          <div className={styles.hero__actions}>
            <LinkBtn size="lg" href="#species" color="primary">
              {t(dict.btn)}
              <FontAwesomeIcon icon={faArrowRight} />
            </LinkBtn>
            <LinkBtn size="lg" href={`/${locale}/handbook`} color="secondary">
              <FontAwesomeIcon icon={faBookOpen} />
              {t(dict.btn_secondary)}
            </LinkBtn>
          </div>

          <HeroStats
            stats={[
              { value: `${totalItems}`, label: dict.stat_species_desc },
              { value: dict.stat_languages, label: dict.stat_languages_desc },
              {
                value: dict.stat_opensource,
                label: dict.stat_opensource_desc,
              },
            ]}
          />
        </div>

        {featured && (
          <Link href={featured.url} className={styles.spotlight}>
            <span className={styles.spotlight__badge}>{t(dict.spotlight)}</span>

            <div className={styles.spotlight__img}>
              <Image
                src={featured.imgUrl}
                alt={featured.title}
                width={560}
                height={420}
                priority
              />
            </div>

            <div className={styles.spotlight__body}>
              <h2 className={styles.spotlight__title}>{featured.title}</h2>
              <p className={styles.spotlight__latin}>
                {featured.scientificName}
              </p>

              <ul className={styles.spotlight__facts}>
                {featured.traits?.size && (
                  <li>
                    <FontAwesomeIcon icon={faRuler} />
                    {featured.traits.size} cm
                  </li>
                )}
                {featured.tankInfo?.temperature && (
                  <li>
                    <FontAwesomeIcon icon={faTemperatureHalf} />
                    {featured.tankInfo.temperature} °C
                  </li>
                )}
                {featured.tankInfo?.volume && (
                  <li>
                    <FontAwesomeIcon icon={faDroplet} />
                    {featured.tankInfo.volume} L
                  </li>
                )}
              </ul>

              <span className={styles.spotlight__link}>
                {t(dict.spotlight_link)}
                <FontAwesomeIcon icon={faArrowRight} />
              </span>
            </div>
          </Link>
        )}
      </div>

      <a href="#species" className={styles.hero__scroll}>
        <span className={styles.hero__mouse} />
        {t(dict.scroll)}
      </a>

      <svg
        className={styles.hero__wave}
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          className={styles.hero__waveBack}
          d="M0,64 C240,24 480,104 720,72 C960,40 1200,96 1440,56 L1440,120 L0,120 Z"
        />
        <path d="M0,88 C320,40 640,120 960,80 C1160,56 1320,72 1440,84 L1440,120 L0,120 Z" />
      </svg>
    </section>
  );
};

export default Hero;
