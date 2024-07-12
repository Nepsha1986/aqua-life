import styles from "./layout.module.css";
export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={styles.layout}>{children}</main>;
}
