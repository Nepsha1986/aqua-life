import Link from "next/link";
import styles from "./styles.module.css";

const NavItem = ({ href, label }: { href: string; label: string }) => (
  <Link className={styles.navigation} href={href}>
    {label}
  </Link>
);
const Navigation = () => {
  return (
    <nav className={styles.navigation}>
      <NavItem href="/handbook" label="Handbook" />
      <NavItem href="/about" label="About" />
    </nav>
  );
};

export default Navigation;
