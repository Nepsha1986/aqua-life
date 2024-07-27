import "server-only";

import { Dictionary, type Locale } from "@/i18n";

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  ru: () => import("../dictionaries/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
