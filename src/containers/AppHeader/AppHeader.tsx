import Search from "@/containers/Search";
import { cookies } from "next/headers";

import Navigation from "./components/Navigation";
import LangSwitcher from "./components/LangSwitcher";
import ThemeSwitcher from "./components/ThemeSwitcher";

import { Theme } from "@/types/theme";

import styles from "./styles.module.scss";

const AppHeader = () => {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");

  return (
    <header className={styles.appHeader} data-testid="app_header">
      <div className={styles.appHeader__container}>
        <div className={styles.appHeader__leftSlot}>
          <Navigation />
        </div>

        <div className={styles.appHeader__rightSlot}>
          <Search />
          <LangSwitcher />
          <ThemeSwitcher initialTheme={theme?.value as Theme} />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
