import { notFound } from "next/navigation";

import { Locale, locales } from "@/i18n";

import styles from "./layout.module.scss";

export default function PagesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { locale: Locale };
}>) {
  const { locale } = params;

  return <main className={styles.layout}>{children}</main>;
}
