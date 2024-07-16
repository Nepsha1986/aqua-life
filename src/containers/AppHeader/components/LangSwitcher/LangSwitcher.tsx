"use client";

import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

import { type Language } from "@/i18n/languages";

import styles from "./styles.module.css";
import { useLanguage } from "@/context/LanguageProvider";

const locales: Record<
  Language,
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

interface Props {
  lang: Language;
}

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

const LangSwitcher: React.FC<Props> = () => {
  const { lang } = useLanguage();

  return (
    <div className={styles.langSwitcher}>
      <LangSwitcherItem active link={`/${lang}`} label={locales[lang].label} />

      <ul className={styles.langSwitcher__list}>
        {Object.keys(locales).map((i) => {
          if (i === lang) return null;

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
  );
};

export default LangSwitcher;
