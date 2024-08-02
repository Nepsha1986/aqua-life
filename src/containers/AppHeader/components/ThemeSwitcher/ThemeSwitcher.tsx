"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faAdjust } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/ui";
import { Theme } from "@/types/theme";

import styles from "./styles.module.css";

const ThemeSwitcher = () => {
  const initialTheme = (Cookies.get("theme") as Theme) || "auto";
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    const applyTheme = (newTheme: Theme) => {
      if (newTheme === "auto") {
        const darkModeMediaQuery = window.matchMedia(
          "(prefers-color-scheme: dark)",
        );
        const handleChange = () => {
          const themeToApply = darkModeMediaQuery.matches ? "dark" : "light";
          document.documentElement.setAttribute("data-theme", themeToApply);
        };
        handleChange();
        darkModeMediaQuery.addEventListener("change", handleChange);
        return () =>
          darkModeMediaQuery.removeEventListener("change", handleChange);
      } else {
        document.documentElement.setAttribute("data-theme", newTheme);
      }
    };

    applyTheme(theme);
    Cookies.set("theme", theme, { expires: 365 });
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className={styles.themeSwitcher}>
      <Button size="sm" iconOnly onClick={() => handleThemeChange("light")}>
        <FontAwesomeIcon icon={faSun} />
      </Button>
      <Button size="sm" iconOnly onClick={() => handleThemeChange("dark")}>
        <FontAwesomeIcon icon={faMoon} />
      </Button>
      <Button size="sm" iconOnly onClick={() => handleThemeChange("auto")}>
        <FontAwesomeIcon icon={faAdjust} />
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
