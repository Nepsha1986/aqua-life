import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCodeBranch } from "@fortawesome/free-solid-svg-icons";

import Logo from "@/components/Logo";
import { Dictionary, Locale, t } from "@/i18n";

import styles from "./styles.module.scss";

const GITHUB_URL = "https://github.com/Nepsha1986/handbook-freshwater-fish";

interface Props {
  dict: Dictionary;
  locale: Locale;
}
const AppFooter = ({ dict, locale }: Props) => {
  const { common, nav, footer_nav } = dict;
  const date = new Date().getFullYear();

  return (
    <footer className={styles.appFooter}>
      <svg
        className={styles.appFooter__wave}
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0,30 C240,60 480,0 720,24 C960,48 1200,8 1440,28 L1440,60 L0,60 Z" />
      </svg>

      <div className={styles.appFooter__container}>
        <div className={styles.appFooter__brand}>
          <Link href={`/${locale}`} aria-label="Aqua Life">
            <Logo size="lg" />
          </Link>
          <p className={styles.appFooter__tagline}>{t(footer_nav.tagline)}</p>
          <a
            className={styles.appFooter__github}
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faCodeBranch} />
            {t(footer_nav.github)}
          </a>
        </div>

        <nav className={styles.appFooter__col}>
          <h2 className={styles.appFooter__colTitle}>
            {t(footer_nav.explore)}
          </h2>
          <Link href={`/${locale}`}>{t(nav.homepage)}</Link>
          <Link href={`/${locale}#species`}>{t(footer_nav.explore)}</Link>
          <Link href={`/${locale}/handbook`}>{t(nav.handbook)}</Link>
        </nav>

        <nav className={styles.appFooter__col}>
          <h2 className={styles.appFooter__colTitle}>
            {t(footer_nav.project)}
          </h2>
          <Link href={`/${locale}/about`}>{t(nav.about)}</Link>
          <Link href={`/${locale}/terms-of-use`}>
            {t(footer_nav.terms_of_use)}
          </Link>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </nav>
      </div>

      <div className={styles.appFooter__bottom}>
        <p>
          &copy; {date} Aqua Life. {t(common.all_rights_reserved)}.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
