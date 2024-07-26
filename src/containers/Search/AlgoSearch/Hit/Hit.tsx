import { Highlight } from "react-instantsearch";
import Link from "next/link";
import { PostPreview } from "@/types";

import styles from "./styles.module.scss";
import Image from "next/image";
import React from "react";

interface Hit extends PostPreview {}
interface Props {
  hit: Hit;
}

const imgPlaceholderUrl = "/fish-img-not-found-placeholder.png";

const Hit = ({ hit }: Props) => {
  return (
    <Link className={styles.hit} href={hit.url} replace={true}>
      <div className={styles.hit__img}>
        <Image
          src={hit.imgUrl ? hit.imgUrl : imgPlaceholderUrl}
          width={320}
          height={240}
          alt={hit.imgUrl ? hit.title : "placeholder"}
        />
      </div>

      <div className={styles.hit__content}>
        <h2 className={styles.hit__title}>
          <Highlight attribute="title" hit={hit as any} />
        </h2>

        <div className={styles.hit__excerpt}>
          <Highlight attribute="excerpt" hit={hit as any} />
        </div>
      </div>
    </Link>
  );
};

export default Hit;
