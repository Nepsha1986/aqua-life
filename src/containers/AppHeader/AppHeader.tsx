import Search from "@/containers/Search";
import Navigation from "./components/Navigation";

import styles from "./styles.module.css";

const AppHeader = () => {
  return (
    <header className={styles.appHeader} data-testid="app_header">
      <div className={styles.appHeader__container}>
        <div className={styles.appHeader__slot}>
          <Navigation />
        </div>

        <div className={styles.appHeader__slot}>
          <Search />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
