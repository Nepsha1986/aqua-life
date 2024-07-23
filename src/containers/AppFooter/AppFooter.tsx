import Link from "next/link";

import { Locale, t } from "@/i18n";

import styles from "./styles.module.scss";

interface Props {
  dict: {
    all_rights_reserved: string;
    terms_of_use: string;
  };
  locale: Locale;
}
const AppFooter = ({ dict, locale }: Props) => {
  const { all_rights_reserved, terms_of_use } = dict;
  const date = new Date().getFullYear();

  return (
    <footer className={styles.appFooter}>
      <div className={styles.appFooter__container}>
        <p style={{ fontSize: "0.9rem" }}>
          &copy; {date} {all_rights_reserved}.
        </p>

        <nav className={styles.appFooter__nav}>
          <Link href={`/${locale}/terms-of-use`}>{t(terms_of_use)}</Link>
        </nav>
      </div>
    </footer>
  );
};

export default AppFooter;
