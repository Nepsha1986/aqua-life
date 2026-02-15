"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/ui";
import { Theme } from "@/types/theme";

import styles from "./styles.module.css";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    window.dispatchEvent(new CustomEvent("themeApplied"));
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
    </div>
  );
};

export default ThemeSwitcher;
