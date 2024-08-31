"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faAdjust } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/ui";
import { Theme } from "@/types/theme";

import styles from "./styles.module.css";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme | undefined>();

  useEffect(() => {
    const savedTheme = (Cookies.get("theme") as Theme) || "auto";
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (newTheme: Theme) => {
    if (newTheme === "auto") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      const themeToApply = darkModeMediaQuery.matches ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", themeToApply);
    } else {
      document.documentElement.setAttribute("data-theme", newTheme);
    }
    Cookies.set("theme", newTheme, { expires: 365 });
    window.dispatchEvent(new CustomEvent("themeApplied"));
  };

  const handleThemeChange = (newTheme: Theme) => {
    applyTheme(newTheme);
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
