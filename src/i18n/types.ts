import * as dictionary from "./dictionaries/en.json";

// Pages translations
import * as homePageI18n from "./dictionaries/homepage/en.json";
import * as handbookPageI18n from "./dictionaries/handbook/en.json";

export type Locale = "en" | "ru";

export type Dictionary = typeof dictionary;

export type HomePageI18n = typeof homePageI18n;
export type HandbookPageI18n = typeof handbookPageI18n;
