import { useState } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
interface Props {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
  color?: "primary" | "secondary" | "default" | "transparent" | "danger";
  iconOnly?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
}
const Button: React.FC<Props> = ({
  children,
  onClick,
  color = "default",
  iconOnly,
  disabled = false,
  style,
  size = "lg",
  className = "",
}) => {
  const [pressed, setPressed] = useState(false);

  const cssClassName = classNames(styles.button, className, {
    [styles.button_disabled]: disabled,
    [styles.button_iconOnly]: iconOnly,
    [styles.button_pressed]: pressed,
    [styles[`button_${color}`]]: !!color,
    [styles[`button_${size}`]]: !!size,
  });

  const handleMouseDown = () => {
    setPressed(true);
  };

  const handleMouseLeave = () => {
    if (pressed) setPressed(false);
  };

  const handleMouseUp = () => {
    setPressed(false);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={cssClassName}
      disabled={disabled}
      style={style}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
    >
      {children}
    </button>
  );
};

export default Button;
