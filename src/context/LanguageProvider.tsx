"use client";

import React, { createContext, useContext } from "react";
import { Language } from "@/i18n/languages";

export const LanguageContext = createContext<{ lang: Language }>({
  lang: "en",
});

export const LanguageProvider = ({
  lang,
  children,
}: {
  lang: Language;
  children: React.ReactNode;
}) => (
  <LanguageContext.Provider value={{ lang }}>
    {children}
  </LanguageContext.Provider>
);

export const useLanguage = () => useContext(LanguageContext);
