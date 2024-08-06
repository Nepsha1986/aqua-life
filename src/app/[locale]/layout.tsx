import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";

import AppHeader from "@/containers/AppHeader";
import AppFooter from "@/containers/AppFooter";
import { LocaleProvider, Locale, locales } from "@/i18n";
import { getDictionary } from "@/i18n/server/getDictionary";
import ErrorPage from "@/app/[locale]/not-found";

import "normalize.css/normalize.css";
import "instantsearch.css/themes/satellite-min.css";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

// TODO: Add appropriate metadata
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const { locale } = params;
  if (!locales.includes(locale)) return <ErrorPage />;

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <AppHeader />
          {children}
          <AppFooter
            dict={{ ...dictionary.common, ...dictionary.footer_nav }}
            locale={locale}
          />
        </LocaleProvider>
      </body>
      <GoogleAnalytics gaId="G-B4XFSSZ1EL" />
    </html>
  );
}
