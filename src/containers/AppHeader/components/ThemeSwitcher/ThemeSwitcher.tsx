"use client";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faAdjust } from "@fortawesome/free-solid-svg-icons";

import { Theme } from "@/types/theme";
import { Button } from "@/ui";

import styles from "./styles.module.css";

interface Props {
  initialTheme: Theme;
}

const ThemeSwitcher = ({ initialTheme }: Props) => {
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
      } else {
        document.documentElement.setAttribute("data-theme", newTheme);
      }
      Cookies.set("theme", newTheme, { expires: 365 });
    };

    applyTheme(theme);
  }, [theme]);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className={styles.themeSwitcher}>
      <Button
        active={theme === "light"}
        size="sm"
        iconOnly
        onClick={() => handleThemeChange("light")}
      >
        <FontAwesomeIcon icon={faSun} />
      </Button>
      <Button
        active={theme === "dark"}
        size="sm"
        iconOnly
        onClick={() => handleThemeChange("dark")}
      >
        <FontAwesomeIcon icon={faMoon} />
      </Button>
      <Button
        active={theme === "auto"}
        size="sm"
        iconOnly
        onClick={() => handleThemeChange("auto")}
      >
        <FontAwesomeIcon icon={faAdjust} />
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
