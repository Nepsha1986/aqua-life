"use client";

import { type ReactNode, useEffect, useRef, FC } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./styles.module.scss";

export const Dialog: FC<{
  open: boolean;
  children: ReactNode;
  onClickClose?: () => void;
  size?: "small" | "medium" | "large";
  heading?: string;
  closeLabel?: string;
}> = ({
  open,
  children,
  onClickClose,
  heading,
  size = "small",
  closeLabel = "Close",
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) dialogRef.current?.showModal();
    if (!open) dialogRef.current?.close();
  }, [open]);

  const className = classNames(styles.dialog, {
    [styles[`dialog_${size}`]]: size,
  });

  return (
    <dialog
      className={className}
      ref={dialogRef}
      onClose={onClickClose}
      onClick={(e) => {
        // Close when clicking on the backdrop
        if (e.target === dialogRef.current) onClickClose?.();
      }}
    >
      <header className={styles.dialog__header}>
        {!!heading && <h2 className={styles.dialog__heading}>{heading}</h2>}

        <button
          type="button"
          className={styles.dialog__close}
          onClick={onClickClose}
          aria-label={closeLabel}
          title={closeLabel}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </header>

      <div className={styles.dialog__main}>{open && children}</div>
    </dialog>
  );
};
