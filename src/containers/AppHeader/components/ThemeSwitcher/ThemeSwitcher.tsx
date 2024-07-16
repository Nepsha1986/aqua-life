"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon, faAdjust } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.css";

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
      <button onClick={() => handleThemeChange("light")}>
        <FontAwesomeIcon icon={faSun} />
      </button>
      <button onClick={() => handleThemeChange("dark")}>
        <FontAwesomeIcon icon={faMoon} />
      </button>
      <button onClick={() => handleThemeChange("auto")}>
        <FontAwesomeIcon icon={faAdjust} />
      </button>
    </div>
  );
};

export default ThemeSwitcher;
