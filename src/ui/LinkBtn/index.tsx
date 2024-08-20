import Link from "next/link";
import classNames from "classnames";

import styles from "../Button/styles.module.scss";

interface Props extends React.ComponentProps<typeof Link> {
  color?: "default" | "primary" | "transparent" | "danger" | "success";
  ghost?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  active?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LinkBtn = ({
  color = "default",
  ghost,
  iconOnly,
  disabled,
  active,
  size = "lg",
  className = "",
  ...rest
}: Props) => {
  const cssClassName = classNames(styles.button, className, {
    [styles.button_disabled]: disabled,
    [styles.button_iconOnly]: iconOnly,
    [styles.button_ghost]: ghost,
    [styles.button_active]: active,
    [styles[`button_${color}`]]: !!color,
    [styles[`button_${size}`]]: !!size,
  });

  return <Link {...rest} className={cssClassName} />;
};
