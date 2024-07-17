import styles from "./styles.module.scss";
const AppFooter = () => {
  const date = new Date().getFullYear();

  return (
    <footer className={styles.appFooter}>
      <div className={styles.appFooter__container}>
        © {date}. All Rights Reserved.
      </div>
    </footer>
  );
};

export default AppFooter;
