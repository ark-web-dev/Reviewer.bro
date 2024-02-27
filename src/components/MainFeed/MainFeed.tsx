import styles from './MainFeed.module.css';
import githubIcon from '@/shared/assets/icons/github-icon.svg?react';
import { Input, LoadHandlingProvider } from '@/shared/ui-components';
import { ContributorsControls } from '../ContributorsControls/ContributorsControls';
import { UserCard } from '../UserCard/UserCard';
import { SearchRepos } from '../SearchRepos/SearchRepos';
import { useUserMetaData } from './hooks/useUserMetaData';
import { appHeights } from '@/shared/const/appHeights';

export const MainFeed: React.FC = () => {
  const user = useUserMetaData();

  return (
    <section className={styles.mainFeed}>
      <Input
        onChangeCallback={user.fetching}
        className={styles.searchUserInput}
        value={user.inputValue}
        placeholder="Github Login"
        icon={githubIcon}
      />

      <LoadHandlingProvider
        isLoading={user.isLoading}
        error={user.error}
        loadingMessage="Loading User..."
        loadHeight={appHeights.user}>
        {user.item && <UserCard user={user.item} />}
      </LoadHandlingProvider>

      {user.item && (
        <>
          <SearchRepos />
          <ContributorsControls />
        </>
      )}
    </section>
  );
};
