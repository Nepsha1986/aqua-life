import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRuler,
  faTemperatureHalf,
  faStar,
  faDroplet,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface Props {
  title: string;
  subTitle: string;
  excerpt: string;
  href: string;
  image: React.ReactNode;
  size?: string;
  temperature?: string;
  careLevel?: string;
  tankVolume?: string | number;
}
const PostCard = ({
  title,
  subTitle,
  excerpt,
  image,
  href,
  size,
  temperature,
  careLevel,
  tankVolume,
}: Props) => {
  const hasInfo = size || temperature || careLevel || tankVolume;

  return (
    <Link className={styles.postCard} href={href}>
      <article className={styles.postCard__article}>
        <div className={styles.postCard__image}>{image}</div>

        <div className={styles.postCard__content}>
          <h1 className={styles.postCard__title}>{title}</h1>

          <p className={styles.postCard__subTitle}>{subTitle}</p>

          {hasInfo && (
            <div className={styles.postCard__infoBar}>
              {size && (
                <span className={styles.postCard__chip}>
                  <FontAwesomeIcon icon={faRuler} />
                  {size} cm
                </span>
              )}
              {temperature && (
                <span className={styles.postCard__chip}>
                  <FontAwesomeIcon icon={faTemperatureHalf} />
                  {temperature} °C
                </span>
              )}
              {careLevel && (
                <span className={styles.postCard__chip}>
                  <FontAwesomeIcon icon={faStar} />
                  {careLevel}
                </span>
              )}
              {tankVolume && (
                <span className={styles.postCard__chip}>
                  <FontAwesomeIcon icon={faDroplet} />
                  {tankVolume} L
                </span>
              )}
            </div>
          )}

          <p className={styles.postCard__excerpt}>{excerpt}</p>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
