"use client";

import { type ReactNode, useEffect, useRef, FC } from "react";
import classNames from "classnames";

import styles from "./styles.module.scss";
import { Button } from "@/ui";

export const Dialog: FC<{
  open: boolean;
  children: ReactNode;
  onClickClose?: () => void;
  size?: "small" | "medium" | "large";
  heading?: string;
}> = ({ open, children, onClickClose, heading, size = "small" }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
    if (!open) dialogRef.current?.close();
  }, [open]);

  const className = classNames(styles.dialog, {
    [styles[`dialog_${size}`]]: size,
  });

  return (
    <dialog className={className} ref={dialogRef}>
      <header className={styles.dialog__header}>
        {!!heading && <h4 style={{ margin: 0 }}>{heading}</h4>}
      </header>

      <div className={styles.dialog__main}>{open && children}</div>

      <footer className={styles.dialog__footer}>
        <Button color="primary" onClick={onClickClose}>
          Close
        </Button>
      </footer>
    </dialog>
  );
};
