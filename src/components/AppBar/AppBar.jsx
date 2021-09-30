import { Navigation } from 'components/Navigation/Navigation';
import styles from './AppBar.module.css';

export const AppBar = () => {
  return (
    <header className={styles.header}>
      <Navigation />
    </header>
  );
};
