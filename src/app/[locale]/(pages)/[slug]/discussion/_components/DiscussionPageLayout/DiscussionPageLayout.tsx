import React from "react";

import styles from "./styles.module.scss";

interface Props {
  header: React.ReactNode;
  card: React.ReactNode;
  rules: React.ReactNode;
  children: React.ReactNode;
}
const DiscussionPageLayout = ({ header, card, rules, children }: Props) => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>{header}</header>

      <div className={styles.layout__main}>
        <div className={styles.layout__cardSlot}>{card}</div>

        <div className={styles.layout__rulesSlot}>{rules}</div>
      </div>

      {children}
    </div>
  );
};

export default DiscussionPageLayout;
