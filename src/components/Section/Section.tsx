import classNames from "classnames";

import styles from "./styles.module.scss";
interface Props extends React.ComponentProps<"section"> {
  heading: string;
  intro: string;
  children: React.ReactNode;
}
const Section = ({ heading, intro, children, ...rest }: Props) => {
  const sectionClass = classNames(styles.section, rest.className);

  return (
    <section className={sectionClass}>
      <h1
        className={styles.section__heading}
        dangerouslySetInnerHTML={{ __html: heading }}
      />
      <p
        className={styles.section__intro}
        dangerouslySetInnerHTML={{ __html: intro }}
      />
      <div className={styles.section__content}>{children}</div>
    </section>
  );
};

export default Section;
