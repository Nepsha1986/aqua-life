import React from "react";
import classNames from "classnames";

import { Rate } from "@/types";

import styles from "./styles.module.scss";

type InfoItemProps = {
  term: string;
  def: string | number;
  icon?: React.ReactNode;
  rate?: Rate;
};

interface ContainerProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const Item = ({ term, def, icon, rate }: InfoItemProps) => {
  return (
    <div
      className={classNames(styles.infoItem, {
        [styles.infoItem_rated]: !!rate,
      })}
    >
      <dt className={styles.infoItem__term}>
        {icon && <span className={styles.infoItem__icon}>{icon}</span>}
        {term}
      </dt>
      <dd className={styles.infoItem__def}>{def}</dd>

      {rate && (
        <div
          className={styles.meter}
          style={
            { "--rate-color": `var(--rate-${rate})` } as React.CSSProperties
          }
          aria-hidden="true"
        >
          {[1, 2, 3, 4, 5].map((step) => (
            <span
              key={step}
              className={classNames(styles.meter__step, {
                [styles.meter__step_filled]: step <= rate,
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Container = ({ title, icon, children }: ContainerProps) => {
  return (
    <section data-testid="info_card" className={styles.infoCard}>
      <h2 className={styles.infoCard__title}>
        {icon && <span className={styles.infoCard__icon}>{icon}</span>}
        {title}
      </h2>
      <dl className={styles.infoCard__list}>{children}</dl>
    </section>
  );
};

const InfoCard = {
  Container,
  Item,
};

export default InfoCard;
