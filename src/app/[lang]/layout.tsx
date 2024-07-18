import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Language } from "@/i18n/languages";
import AppHeader from "@/containers/AppHeader";
import AppFooter from "@/containers/AppFooter";
import { LanguageProvider } from "@/context/LanguageProvider";

import "normalize.css/normalize.css";
import "instantsearch.css/themes/satellite-min.css";
import "@/styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Language };
}>) {
  const { lang } = params;

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <LanguageProvider lang={lang}>
          <AppHeader />
          {children}
          <AppFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
