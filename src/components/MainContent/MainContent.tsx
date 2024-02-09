import styles from './MainContent.module.css';
import { MainFeed } from '../MainFeed/MainFeed';

export const MainContent: React.FC = () => {
  return (
    <main className={styles.mainContent}>
      <h2 className={styles.mainTitle}>
        Reviewer<span className={styles.mainTitelSub}>.bro</span>
      </h2>

      <MainFeed />
    </main>
  );
};
