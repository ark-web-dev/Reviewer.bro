import styles from './MainContent.module.css';
import { FC, memo } from 'react';
import { MainFeed } from '../MainFeed/MainFeed';

export const MainContent: FC = memo(() => {
  return (
    <main className={styles.mainContent}>
      <h2 className={styles.mainTitle}>
        Reviewer<span className={styles.mainTitelSub}>.bro</span>
      </h2>

      <MainFeed />
    </main>
  );
});
