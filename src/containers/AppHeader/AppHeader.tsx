import Search from "@/containers/Search";
import Navigation from "./components/Navigation";
import LangSwitcher from "./components/LangSwitcher";
import ThemeSwitcher from "./components/ThemeSwitcher";

import styles from "./styles.module.scss";

const AppHeader = () => {
  return (
    <header className={styles.appHeader} data-testid="app_header">
      <div className={styles.appHeader__container}>
        <div className={styles.appHeader__leftSlot}>
          <Navigation />
        </div>

        <div className={styles.appHeader__rightSlot}>
          <Search />
          <LangSwitcher />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
