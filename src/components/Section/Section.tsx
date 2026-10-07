import classNames from "classnames";

import styles from "./styles.module.scss";
interface Props extends React.ComponentProps<"section"> {
  heading: string;
  intro: string;
  eyebrow?: string;
  children: React.ReactNode;
}
const Section = ({
  heading,
  intro,
  eyebrow,
  children,
  className,
  ...rest
}: Props) => {
  const sectionClass = classNames(styles.section, className);

  return (
    <section {...rest} className={sectionClass}>
      <div className={styles.section__header}>
        {eyebrow && <span className={styles.section__eyebrow}>{eyebrow}</span>}
        <h2
          className={styles.section__heading}
          dangerouslySetInnerHTML={{ __html: heading }}
        />
        <p
          className={styles.section__intro}
          dangerouslySetInnerHTML={{ __html: intro }}
        />
      </div>
      <div className={styles.section__content}>{children}</div>
    </section>
  );
};

export default Section;
