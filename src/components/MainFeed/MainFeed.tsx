import styles from './MainFeed.module.css';
import githubIcon from '@/shared/assets/icons/github-icon.svg?react';
import { debounce } from '@/shared/lib';
import { Input, LoadHandlingProvider } from '@/shared/ui-components';
import { ContributorsControls } from '../ContributorsControls/ContributorsControls';
import { UserCard } from '../UserCard/UserCard';
import classNames from 'classnames';
import { SearchRepos } from '../SearchRepos/SearchRepos';
import { useUserMetaData } from './hooks/useUserMetaData';
import { useMemo } from 'react';

export const MainFeed: React.FC = () => {
  const user = useUserMetaData();

  const debouncedUserFetching = useMemo(
    () => debounce(user.fetching, 1500),
    [user.fetching]
  );

  return (
    <section
      className={classNames(styles.mainFeed, user.item && styles.alignTop)}>
      <Input
        onChangeCallback={debouncedUserFetching}
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
          <SearchRepos userLogin={user.item.login} />
          <ContributorsControls />
        </>
      )}
    </section>
  );
};
