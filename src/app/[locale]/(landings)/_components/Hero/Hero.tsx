import { LinkBtn } from "@/ui";
import { Locale, t } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/hero/en.json";

import styles from "./styles.module.scss";

interface Props {
  locale: Locale;
}
const Hero = async ({ locale }: Props) => {
  const dict = await getDictionary<typeof dictionary>(locale, "hero");

  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg} />

      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>{t(dict.title)}</h1>
        <p className={styles.hero__subTitle}>{t(dict.sub_title)}</p>

        <LinkBtn
          className={styles.hero__btn}
          color="primary"
          href={`${locale}/handbook`}
          ghost
        >
          {t(dict.btn)}
        </LinkBtn>
      </div>
    </section>
  );
};

export default Hero;
