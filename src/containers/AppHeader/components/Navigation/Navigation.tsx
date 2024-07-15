"use client";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";

import { useLanguage } from "@/context/LanguageProvider";
import styles from "./styles.module.css";

const navItems: {
  path: string;
  label: string;
}[] = [
  {
    path: "",
    label: "Homepage",
  },
  {
    path: "/handbook",
    label: "Handbook",
  },
  {
    path: "/about",
    label: "About",
  },
];

const NavItem = ({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active?: boolean;
}) => (
  <Link
    className={classNames(styles.navigation, {
      [styles.navItem_active]: active,
    })}
    href={href}
  >
    {label}
  </Link>
);
const Navigation = () => {
  const { lang } = useLanguage();
  const pathname = usePathname();

  return (
    <nav className={styles.navigation}>
      {navItems.map((i) => {
        const href = `/${lang}${i.path}`;
        return (
          <NavItem
            key={i.path}
            active={href === pathname}
            href={href}
            label={i.label}
          />
        );
      })}
    </nav>
  );
};

export default Navigation;
