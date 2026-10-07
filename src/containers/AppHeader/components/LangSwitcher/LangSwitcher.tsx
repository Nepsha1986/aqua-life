"use client";

import React from "react";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { type Locale, locales, useLocale, t } from "@/i18n";

import styles from "./styles.module.scss";

const labels: Record<Locale, { short: string; full: string }> = {
  en: { short: "EN", full: "English" },
  ru: { short: "RU", full: "Русский" },
};

const LangSwitcher = () => {
  const { locale, dictionary } = useLocale();
  const path = usePathname();

  return (
    <nav
      className={styles.langSwitcher}
      aria-label={t(dictionary.common.language)}
    >
      {locales.map((i) => {
        const active = i === locale;

        return (
          <Link
            key={i}
            href={active ? path : path.replace(`/${locale}`, `/${i}`)}
            hrefLang={i}
            lang={i}
            title={labels[i].full}
            aria-current={active ? "true" : undefined}
            className={classNames(styles.langSwitcher__item, {
              [styles.langSwitcher__item_active]: active,
            })}
          >
            {labels[i].short}
          </Link>
        );
      })}
    </nav>
  );
};

export default LangSwitcher;
