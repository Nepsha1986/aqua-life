import React from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";

interface Props {
  message: string;
  description?: string;
  type?: "success" | "warning" | "danger";
  className?: string;
}

export const Alert: React.FC<Props> = ({
  message,
  description,
  type = "warning",
  className,
  ...props
}) => {
  const classname = classNames(
    styles.alert,
    {
      [styles[`alert_${type}`]]: true,
    },
    className,
  );

  return (
    <div data-testid="alert" className={classname} {...props}>
      <h3 className={styles.alert__message}>{message}</h3>
      {description && (
        <p className={styles.alert__description}>{description}</p>
      )}
    </div>
  );
};
