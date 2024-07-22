import "server-only";

import { type Locale, locales } from "@/i18n";

const importDictionary = (locale: Locale, page: string) =>
  import(`../dictionaries/${page}/${locale}.json`).then(
    (module) => module.default,
  );

const dictionaries: Record<Locale, (page: string) => Promise<any>> =
  {} as Record<Locale, (page: string) => Promise<any>>;

locales.forEach((locale) => {
  dictionaries[locale] = (page: string) => importDictionary(locale, page);
});

export const getPageContent = async <T extends Record<string, any>>(
  locale: Locale,
  page: string,
): Promise<T> => {
  return dictionaries[locale](page);
};
