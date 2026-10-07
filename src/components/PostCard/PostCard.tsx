import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRuler,
  faTemperatureHalf,
  faDroplet,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

import { Rate } from "@/types";

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
  careRate?: Rate;
  tankVolume?: string | number;
  family?: string;
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
  careRate,
  tankVolume,
  family,
}: Props) => {
  const hasInfo = size || temperature || tankVolume;

  return (
    <Link className={styles.postCard} href={href}>
      <article className={styles.postCard__article}>
        <div className={styles.postCard__image}>
          {image}

          {careLevel && (
            <span
              className={classNames(
                styles.postCard__care,
                careRate && styles[`postCard__care_${careRate}`],
              )}
            >
              <span className={styles.postCard__careDot} />
              {careLevel}
            </span>
          )}
        </div>

        <div className={styles.postCard__content}>
          <h3 className={styles.postCard__title}>{title}</h3>

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
              {tankVolume && (
                <span className={styles.postCard__chip}>
                  <FontAwesomeIcon icon={faDroplet} />
                  {tankVolume} L
                </span>
              )}
            </div>
          )}

          <p className={styles.postCard__excerpt}>{excerpt}</p>

          <div className={styles.postCard__footer}>
            <span className={styles.postCard__family}>{family}</span>
            <span className={styles.postCard__arrow} aria-hidden="true">
              <FontAwesomeIcon icon={faArrowRight} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default PostCard;
