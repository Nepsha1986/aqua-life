import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Inter, Unbounded } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import AppHeader from "@/containers/AppHeader";
import AppFooter from "@/containers/AppFooter";
import DepthGauge from "@/components/DepthGauge";
import { LocaleProvider, Locale, locales } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import dictionary from "@/i18n/dictionaries/all/en.json";
import seoDictionary from "@/i18n/dictionaries/homepage_seo/en.json";
import { GOOGLE_ANALYTICS_ID, SITE_URL } from "@/utils/variables";

import "normalize.css/normalize.css";
import "instantsearch.css/themes/satellite-min.css";
import "@/styles/globals.scss";

const bodyFont = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

// Only the known locales are valid: anything else is a real 404
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const dict = await getDictionary<typeof seoDictionary>(
    locale as Locale,
    "homepage_seo",
  );

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: dict.title,
      template: "%s | Aqua Life",
    },
    description: dict.description,
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const typedLocale = locale as Locale;

  const dict = await getDictionary<typeof dictionary>(typedLocale, "all");
  const applyThemeInitScript = `(function(){try{var t=localStorage.getItem("theme")||"dark";if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})()`;

  return (
    <html lang={typedLocale} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: applyThemeInitScript,
          }}
        />
      </head>
      <body className={`${bodyFont.variable} ${displayFont.variable}`}>
        <LocaleProvider locale={typedLocale} dictionary={dict}>
          <AppHeader locale={typedLocale} />
          {children}
          <AppFooter dict={dict} locale={typedLocale} />
          <DepthGauge />
        </LocaleProvider>
      </body>
      <GoogleAnalytics gaId={GOOGLE_ANALYTICS_ID} />
    </html>
  );
}
