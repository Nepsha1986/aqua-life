import styles from "./styles.module.scss";

interface Props {
  title: string;
  subTitle: string;
}
const Hero = ({ title, subTitle }: Props) => {
  return (
    <section className={styles.hero}>
      <div className={styles.hero__bg} />

      <div className={styles.hero__content}>
        <h1 className={styles.hero__title}>{title}</h1>
        <p className={styles.hero__subTitle}>{subTitle}</p>
      </div>
    </section>
  );
};

export default Hero;
