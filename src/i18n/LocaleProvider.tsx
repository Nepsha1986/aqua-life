"use client";

import React, { createContext, useContext } from "react";
import { Locale } from "@/i18n/locales";
import { Dictionary } from "@/i18n/types";

type ILocaleContext = {
  locale: Locale;
  dictionary: Dictionary;
};
export const LocaleContext = createContext<ILocaleContext>({
  locale: "en",
  dictionary: {},
});

export const LocaleProvider = ({
  locale,
  dictionary,
  children,
}: ILocaleContext & {
  children: React.ReactNode;
}) => (
  <LocaleContext.Provider value={{ locale, dictionary }}>
    {children}
  </LocaleContext.Provider>
);

export const useLocale = () => useContext(LocaleContext);
