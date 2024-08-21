import dictionary from "./dictionaries/all/en.json";

import * as unverifiedAlertI18n from "./dictionaries/unverified_alert/en.json";

export type Locale = "en" | "ru";
export type Dictionary = typeof dictionary;

export type UnverifiedAlertI18n = typeof unverifiedAlertI18n;
