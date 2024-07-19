import styles from "./styles.module.scss";

interface Props {
  dict: {
    all_rights_reserved: string;
  };
}
const AppFooter = ({ dict }: Props) => {
  const { all_rights_reserved } = dict;
  const date = new Date().getFullYear();

  return (
    <footer className={styles.appFooter}>
      <div className={styles.appFooter__container}>
        <p style={{ fontSize: "0.9rem" }}>
          &copy; {date} {all_rights_reserved}.
        </p>
      </div>
    </footer>
  );
};

export default AppFooter;
