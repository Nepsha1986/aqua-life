import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleCheck,
  faTriangleExclamation,
  faCircleXmark,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

interface Props {
  title?: string;
  description?: string;
  type?: "success" | "warning" | "danger" | "info";
  className?: string;
  footer?: React.ReactNode;
}

const icons = {
  success: faCircleCheck,
  warning: faTriangleExclamation,
  danger: faCircleXmark,
  info: faLightbulb,
};

export const Alert: React.FC<Props> = ({
  title,
  description,
  type = "warning",
  className,
  footer,
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
      <span className={styles.alert__icon} aria-hidden="true">
        <FontAwesomeIcon icon={icons[type]} />
      </span>

      <div className={styles.alert__body}>
        {title && <h3 className={styles.alert__message}>{title}</h3>}
        {description && (
          <p
            className={styles.alert__description}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {footer && <footer className={styles.alert__footer}>{footer}</footer>}
      </div>
    </div>
  );
};
