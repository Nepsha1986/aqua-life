"use client";

import { useEffect, useState } from "react";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import { t, useLocale } from "@/i18n";

import styles from "./styles.module.scss";

// Depth (in meters) reached at the very bottom of the page
const MAX_DEPTH = 120;

// A "dive computer" that shows how deep the reader has scrolled and brings
// them back to the surface (top of the page) on click.
const DepthGauge = () => {
  const { locale, dictionary } = useLocale();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      setVisible(window.scrollY > 400);
    };

    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const depth = Math.round(progress * MAX_DEPTH);
  const unit = locale === "ru" ? "м" : "m";

  return (
    <button
      type="button"
      className={classNames(styles.depthGauge, {
        [styles.depthGauge_visible]: visible,
      })}
      style={{ "--progress": progress } as React.CSSProperties}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t(dictionary.common.back_to_top)}
      title={t(dictionary.common.back_to_top)}
      tabIndex={visible ? 0 : -1}
    >
      <span className={styles.depthGauge__ring} aria-hidden="true" />
      <span className={styles.depthGauge__icon} aria-hidden="true">
        <FontAwesomeIcon icon={faArrowUp} />
      </span>
      <span className={styles.depthGauge__depth} aria-hidden="true">
        −{depth}
        <small>{unit}</small>
      </span>
    </button>
  );
};

export default DepthGauge;
