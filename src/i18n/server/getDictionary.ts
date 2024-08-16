import "server-only";

import { type Locale, locales } from "@/i18n";

const importDictionary = (locale: Locale, dictionary: string) =>
  import(`../dictionaries/${dictionary}/${locale}.json`).then(
    (module) => module.default,
  );

const dictionaries: Record<Locale, (dictionary: string) => Promise<any>> =
  {} as Record<Locale, (dictionary: string) => Promise<any>>;

locales.forEach((locale) => {
  dictionaries[locale] = (dictionary: string) =>
    importDictionary(locale, dictionary);
});

export const getDictionary = async <T extends Record<string, any>>(
  locale: Locale,
  dictionary: string,
): Promise<T> => {
  return dictionaries[locale](dictionary);
};
