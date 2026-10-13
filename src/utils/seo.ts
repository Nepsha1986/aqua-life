import type { Metadata } from "next";

import { type Locale, locales } from "@/i18n";
import { SITE_URL } from "@/utils/variables";

// Canonical URL + hreflang links for a page that exists in every locale.
// `path` is the locale-less path, e.g. "" for the homepage or "/about".
export const getAlternates = (
  locale: Locale,
  path: string,
): Metadata["alternates"] => ({
  canonical: `/${locale}${path}`,
  languages: {
    ...Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
    "x-default": `/en${path}`,
  },
});
