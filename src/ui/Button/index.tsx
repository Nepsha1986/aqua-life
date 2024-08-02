"use client";
import { useState } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
interface Props {
  children: React.ReactNode;
  link?: string;
  onClick?: () => void;
  color?: "default" | "primary" | "transparent" | "danger" | "success";
  ghost?: boolean;
  iconOnly?: boolean;
  disabled?: boolean;
  active?: boolean;
  style?: React.CSSProperties;
  size?: "sm" | "md" | "lg";
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
}
export const Button: React.FC<Props> = ({
  children,
  onClick,
  color = "default",
  ghost = false,
  active = false,
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
    [styles.button_ghost]: ghost,
    [styles.button_active]: active,
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
