"use client";

import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { type Locale, useLocale } from "@/i18n";

import styles from "./styles.module.scss";

const locales: Record<
  Locale,
  {
    label: string;
  }
> = {
  en: {
    label: "English",
  },
  ru: {
    label: "Русский",
  },
};

const LangSwitcherItem: React.FC<{
  label: string;
  link: string;
  active?: boolean;
}> = ({ link, label, active = false }) => {
  const className = classNames(styles.langSwitcherItem, {
    [styles.langSwitcherItem_active]: active,
  });

  return (
    <Link href={link} className={className}>
      {active && (
        <span className={styles.langSwitcherItem__icon}>
          <FontAwesomeIcon icon={faGlobe} />
        </span>
      )}
      <span className={styles.langSwitcherItem__label}>{label}</span>
    </Link>
  );
};

const LangSwitcher = () => {
  const { locale } = useLocale();

  return (
    <div className={styles.langSwitcher}>
      <LangSwitcherItem
        active
        link={`/${locale}`}
        label={locales[locale].label}
      />

      <div className={styles.langSwitcher__dropdown}>
        <ul className={styles.langSwitcher__list}>
          {Object.keys(locales).map((i) => {
            if (i === locale) return null;

            return (
              <li key={i} className={styles.langSwitcher__item}>
                <LangSwitcherItem
                  link={`/${i}`}
                  label={locales[i as keyof typeof locales].label}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default LangSwitcher;
