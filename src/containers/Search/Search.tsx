"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Dialog } from "@/ui";
import AlgoSearch from "./AlgoSearch";
import { useLocale, t } from "@/i18n";

import styles from "./styles.module.scss";

const Search = () => {
  const { dictionary, locale } = useLocale();
  const pathname = usePathname();
  // The dialog stays open only on the page it was opened on, so navigating
  // to a search result closes it automatically.
  const [openedOn, setOpenedOn] = useState<string | null>(null);
  const active = openedOn === pathname;
  const setActive = (value: boolean) => setOpenedOn(value ? pathname : null);

  // Open with Ctrl+K / Cmd+K or "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isTyping =
        target.isContentEditable ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName);

      if (
        (e.key === "k" && (e.metaKey || e.ctrlKey)) ||
        (e.key === "/" && !isTyping)
      ) {
        e.preventDefault();
        setOpenedOn(pathname);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [pathname]);

  return (
    <>
      <button
        type="button"
        className={styles.searchTrigger}
        onClick={() => setActive(true)}
        aria-label={t(dictionary.common.search)}
      >
        <FontAwesomeIcon
          icon={faSearch}
          className={styles.searchTrigger__icon}
        />
        <span className={styles.searchTrigger__label}>
          {t(dictionary.common.search_placeholder)}
        </span>
        <kbd className={styles.searchTrigger__kbd}>/</kbd>
      </button>

      <Dialog
        size="large"
        heading={t(dictionary.common.search_title)}
        closeLabel={t(dictionary.common.close)}
        open={active}
        onClickClose={() => setActive(false)}
      >
        <AlgoSearch
          index={`${locale}_fishes`}
          placeholder={t(dictionary.common.search_placeholder)}
        />
      </Dialog>
    </>
  );
};

export default Search;
