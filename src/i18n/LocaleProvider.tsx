"use client";
import React, { createContext, useContext } from "react";

import { type Locale, type Dictionary } from "@/i18n";

type ILocaleContext = {
  locale: Locale;
  dictionary: Dictionary;
};
export const LocaleContext = createContext<ILocaleContext>({
  locale: "en",
  dictionary: {} as Dictionary,
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
