import styles from "./layout.module.scss";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={styles.layout}>{children}</main>;
}
