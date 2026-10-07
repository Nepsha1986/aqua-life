import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface Props {
  items: { label: string; href?: string }[];
}

const Breadcrumbs = ({ items }: Props) => (
  <nav aria-label="Breadcrumb" className={styles.breadcrumbs}>
    <ol className={styles.breadcrumbs__list}>
      {items.map((item, index) => (
        <li key={index} className={styles.breadcrumbs__item}>
          {item.href ? (
            <Link href={item.href}>{item.label}</Link>
          ) : (
            <span aria-current="page">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <FontAwesomeIcon
              icon={faChevronRight}
              className={styles.breadcrumbs__sep}
            />
          )}
        </li>
      ))}
    </ol>
  </nav>
);

export default Breadcrumbs;
