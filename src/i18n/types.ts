import dictionary from "./dictionaries/all/en.json";

import * as homePageI18n from "./dictionaries/homepage/en.json";
import * as unverifiedAlertI18n from "./dictionaries/unverified_alert/en.json";

export type Locale = "en" | "ru";
export type Dictionary = typeof dictionary;

export type HomePageI18n = typeof homePageI18n;
export type UnverifiedAlertI18n = typeof unverifiedAlertI18n;
