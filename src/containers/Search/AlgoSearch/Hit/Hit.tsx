import { Highlight } from "react-instantsearch";
import Link from "next/link";
import { PostPreview } from "@/types";

import styles from "./styles.module.scss";

interface Hit extends PostPreview {}
interface Props {
  hit: Hit;
}

const Hit = ({ hit }: Props) => {
  return (
    <Link className={styles.hit} href={hit.url} replace={true}>
      <div className={styles.hit__img}>
        <img src={hit.imgUrl} alt={hit.title} />
      </div>

      <div className={styles.hit__content}>
        <h2 className={styles.hit__title}>
          <Highlight attribute="title" hit={hit as any} />
        </h2>

        <div className={styles.hit__exerpt}>
          <Highlight attribute="excerpt" hit={hit as any} />
        </div>
      </div>
    </Link>
  );
};

export default Hit;
