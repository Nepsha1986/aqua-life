"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faAdjust } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";
import Button from "@/components/Button/Button";

const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("auto");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === "auto") {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      const handleChange = () => {
        if (darkModeMediaQuery.matches) {
          document.documentElement.setAttribute("data-theme", "dark");
        } else {
          document.documentElement.setAttribute("data-theme", "light");
        }
      };
      handleChange();
      darkModeMediaQuery.addEventListener("change", handleChange);
      return () =>
        darkModeMediaQuery.removeEventListener("change", handleChange);
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleThemeChange = (newTheme: "light" | "dark" | "auto") => {
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
