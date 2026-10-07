"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import { Theme } from "@/types/theme";
import { t, useLocale } from "@/i18n";

import styles from "./styles.module.scss";

// The icon shown is driven purely by the `data-theme` attribute (set before
// hydration by the init script), so there is no flash of the wrong icon.
const ThemeSwitcher = () => {
  const { dictionary } = useLocale();

  const handleClick = () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme: Theme = current === "dark" ? "light" : "dark";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new CustomEvent("themeApplied"));
  };

  return (
    <button
      type="button"
      className={styles.themeSwitcher}
      onClick={handleClick}
      aria-label={t(dictionary.common.toggle_theme)}
      title={t(dictionary.common.toggle_theme)}
    >
      <FontAwesomeIcon icon={faSun} className={styles.themeSwitcher__sun} />
      <FontAwesomeIcon icon={faMoon} className={styles.themeSwitcher__moon} />
    </button>
  );
};

export default ThemeSwitcher;
