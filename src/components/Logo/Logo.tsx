import classNames from "classnames";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  size?: "md" | "lg";
}

export const FishGlyph = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" aria-hidden="true">
    <path
      fill="currentColor"
      d="M4.5 16c3.4-5 8-7.2 12.6-6.7 2.8.3 5 1.7 6.4 3.4l4-3.2v13l-4-3.2c-1.4 1.7-3.6 3.1-6.4 3.4C12.5 23.2 7.9 21 4.5 16Z"
    />
    <circle cx="18" cy="14.4" r="1.4" fill="var(--logo-eye, #063a5a)" />
  </svg>
);

const Logo = ({ className, size = "md" }: Props) => (
  <span className={classNames(styles.logo, styles[`logo_${size}`], className)}>
    <span className={styles.logo__mark}>
      <FishGlyph className={styles.logo__fish} />
      <span className={styles.logo__bubble} />
      <span className={styles.logo__bubble} />
    </span>
    <span className={styles.logo__word}>
      Aqua<span className={styles.logo__accent}>Life</span>
    </span>
  </span>
);

export default Logo;
