"use client";
import Link from "next/link";
import classNames from "classnames";

import { usePathname } from "next/navigation";
import { useLocale } from "@/i18n/LocaleProvider";

import styles from "./styles.module.scss";

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
    className={classNames(styles.navItem, {
      [styles.navItem_active]: active,
    })}
    href={href}
  >
    {label}
  </Link>
);
const Navigation = () => {
  const { locale, dictionary } = useLocale();
  const pathname = usePathname();

  const navItems: {
    path: string;
    label: string;
  }[] = [
    {
      path: "",
      label: dictionary.nav.homepage,
    },
    {
      path: "/handbook",
      label: dictionary.nav.handbook,
    },
    {
      path: "/about",
      label: dictionary.nav.about,
    },
  ];

  return (
    <nav className={styles.navigation}>
      {navItems.map((i) => {
        const href = `/${locale}${i.path}`;

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
