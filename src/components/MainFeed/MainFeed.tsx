import styles from './MainFeed.module.css';
import codeIcon from '@/shared/assets/icons/code-icon.svg?react';
import githubIcon from '@/shared/assets/icons/github-icon.svg?react';
import bookIcon from '@/shared/assets/icons/book-icon.svg?react';
import { debounce } from '@/shared/lib';
import { Input, LoadSection } from '@/shared/ui-components';
import { useMemo, useEffect } from 'react';
import { ContributorsControls } from '../ContributorsControls/ContributorsControls';
import { SearchBox } from '../SearchBox/SearchBox';
import { UserCard } from '../UserCard/UserCard';
import { useMetaData } from './hooks/useMetaData';
import classNames from 'classnames';

export const MainFeed: React.FC = () => {
  const { user, repos, contributors } = useMetaData();

  const debouncedUserFetching = useMemo(
    () =>
      debounce((value: string) => {
        user.fetching(value);
      }, 700),
    []
  );

  useEffect(() => {
    if (user.item && !repos.items) {
      repos.fetching(user.item?.login);
    }
  }, [user.item]);

  return (
    <section
      className={classNames(styles.mainFeed, user.item && styles.alignTop)}>
      <Input
        onChangeCallback={debouncedUserFetching}
        className={styles.searchUserInput}
        placeholder="Github Login"
        icon={githubIcon}
      />

      <LoadSection isLoading={user.isLoading} error={user.error}>
        {user.item && <UserCard user={user.item} />}
      </LoadSection>

      <LoadSection isLoading={repos.isLoading} error={repos.error}>
        {repos.items && (
          <SearchBox
            searchList={repos.items}
            onListItemClick={contributors.fetching}
            placeholder="Search Repository"
            searchInputSvgIcon={codeIcon}
            listItemSvgIcon={bookIcon}
          />
        )}
      </LoadSection>

      <LoadSection
        isLoading={contributors.isLoading}
        error={contributors.error}>
        {contributors.items && (
          <ContributorsControls contributors={contributors.items} />
        )}
      </LoadSection>
    </section>
  );
};
