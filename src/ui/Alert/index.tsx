import classNames from "classnames";

import styles from "./styles.module.scss";

interface Props {
  message: string;
  description?: string;
  type?: "success" | "warning" | "danger";
}
export const Alert = ({ message, description, type = "warning" }: Props) => {
  const classname = classNames(styles.alert, {
    [styles[`alert_${type}`]]: true,
  });

  return (
    <div data-testid="alert" className={classname}>
      <h3 className={styles.alert__message}>{message}</h3>
      {description && (
        <p className={styles.alert__description}>{description}</p>
      )}
    </div>
  );
};
