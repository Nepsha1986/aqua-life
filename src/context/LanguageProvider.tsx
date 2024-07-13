"use client";

import { createContext, useContext } from "react";

export const LanguageContext = createContext({});

export const LanguageProvider = ({ lang, children }) => (
  <LanguageContext.Provider value={{ lang }}>
    {children}
  </LanguageContext.Provider>
);

export const useLanguage = () => useContext(LanguageContext);
