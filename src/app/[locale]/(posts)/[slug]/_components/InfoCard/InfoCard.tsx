import React from "react";

import styles from "./styles.module.scss";

type InfoItemProps = {
  term: string;
  def: string | number;
};

interface ContainerProps {
  title: string;
  children: React.ReactNode;
}

const Item = ({ term, def }: InfoItemProps) => {
  return (
    <div className={styles.infoItem}>
      <span className={styles.infoItem__term}>{term}:</span>
      <span className={styles.infoItem__def}>{def}</span>
    </div>
  );
};

const Container = ({ title, children }: ContainerProps) => {
  return (
    <div data-testid="info_card" className={styles.infoCard}>
      <h3 className={styles.infoCard__title}>{title}</h3>
      {children}
    </div>
  );
};

const InfoCard = {
  Container,
  Item,
};

export default InfoCard;
