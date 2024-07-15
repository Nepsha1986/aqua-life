"use client";
import Link from "next/link";

import { useLanguage } from "@/context/LanguageProvider";
import styles from "./styles.module.css";

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link className={styles.navigation} href={href}>
    {label}
  </Link>
);
const Navigation = () => {
  const { lang } = useLanguage();

  return (
    <nav className={styles.navigation}>
      <NavItem href={`/${lang}`} label="Homepage" />
      <NavItem href={`/${lang}/handbook`} label="Handbook" />
      <NavItem href={`/${lang}/about`} label="About" />
    </nav>
  );
};

export default Navigation;
