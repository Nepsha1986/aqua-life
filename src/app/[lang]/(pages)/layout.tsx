import { notFound } from "next/navigation";

import { Language, languages } from "@/i18n/languages";
import styles from "./layout.module.css";
export default function PagesLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Language };
}>) {
  const { lang } = params;

  if (!languages.includes(lang)) notFound();

  return <main className={styles.layout}>{children}</main>;
}
