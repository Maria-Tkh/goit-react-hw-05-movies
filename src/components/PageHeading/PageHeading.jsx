import styles from './PageHeading.module.css';

export const PageHeading = ({ text }) => {
  return <h1 className={styles.title}>{text}</h1>;
};
