import styles from './MainFeed.module.css';
import githubIcon from '@/shared/assets/icons/github-icon.svg?react';
import { Input, LoadHandlingProvider } from '@/shared/ui-components';
import { ContributorsControls } from '../ContributorsControls/ContributorsControls';
import { UserCard } from '../UserCard/UserCard';
import classNames from 'classnames';
import { SearchRepos } from '../SearchRepos/SearchRepos';
import { useUserMetaData } from './hooks/useUserMetaData';

export const MainFeed: React.FC = () => {
  const user = useUserMetaData();

  return (
    <section
      className={classNames(styles.mainFeed, user.item && styles.alignTop)}>
      <Input
        onChangeCallback={user.fetching}
        className={styles.searchUserInput}
        placeholder="Github Login"
        icon={githubIcon}
      />

      <LoadHandlingProvider
        isLoading={user.isLoading}
        error={user.error}
        loadingMessage="Loading User...">
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
