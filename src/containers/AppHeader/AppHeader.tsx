import Link from "next/link";

import Search from "@/containers/Search";
import Logo from "@/components/Logo";
import { type Locale } from "@/i18n";

import Navigation from "./components/Navigation";
import LangSwitcher from "./components/LangSwitcher";
import ThemeSwitcher from "./components/ThemeSwitcher";

import styles from "./styles.module.scss";

interface Props {
  locale: Locale;
}

const AppHeader = ({ locale }: Props) => {
  return (
    <header className={styles.appHeader} data-testid="app_header">
      <div className={styles.appHeader__container}>
        <Link
          href={`/${locale}`}
          className={styles.appHeader__logo}
          aria-label="Aqua Life"
        >
          <Logo />
        </Link>

        <div className={styles.appHeader__nav}>
          <Navigation />
        </div>

        <div className={styles.appHeader__actions}>
          <Search />
          <LangSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
