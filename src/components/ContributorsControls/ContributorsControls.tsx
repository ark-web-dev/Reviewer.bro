import styles from './ContributorsControls.module.css';
import CloseIcon from '@/shared/assets/icons/close-icon.svg?react';
import groupIcon from '@/shared/assets/icons/group-icon.svg?react';
import userIcon from '@/shared/assets/icons/user-icon.svg?react';
import { generateId, getRandomNumber } from '@/shared/lib';
import { IUser } from '@/shared/types/types';
import { Icon, LoadSection } from '@/shared/ui-components';
import { memo } from 'react';
import { SearchBox } from '../SearchBox/SearchBox';
import { UserCard } from '../UserCard/UserCard';
import { useContributorsMetaData } from './hooks/useContributorsMetaData';

type ContributorsControlsProps = {
  contributors: IUser[];
};

export const ContributorsControls: React.FC<ContributorsControlsProps> = memo(
  ({ contributors }) => {
    const { filteredContributors, randomReviewer, blackList } =
      useContributorsMetaData(contributors);

    return (
      <div className={styles.controls}>
        {contributors && (
          <SearchBox
            placeholder="Add to Black List"
            searchList={filteredContributors.items}
            onListItemClick={blackList.add}
            searchInputSvgIcon={groupIcon}
            listItemSvgIcon={userIcon}
          />
        )}

        {blackList.items.length > 0 && (
          <ul className={styles.blackList}>
            {blackList.items.map((login) => (
              <li key={generateId()} className={styles.blackListItem}>
                {login}
                <Icon
                  Svg={CloseIcon}
                  clickable
                  onClick={() => blackList.delete(login)}
                  width={15}
                  height={15}
                />
              </li>
            ))}
          </ul>
        )}

        <button
          className={styles.randButton}
          disabled={!filteredContributors.length || randomReviewer.isLoading}
          type="button"
          onClick={() =>
            randomReviewer.fetching(
              filteredContributors.items?.[
                getRandomNumber(0, filteredContributors.length)
              ]?.login
            )
          }>
          Show Random Reviewer
        </button>

        <LoadSection
          isLoading={randomReviewer.isLoading}
          loadingMessage="Loading Random Reviewer..."
          error={randomReviewer.error}>
          {randomReviewer.item && filteredContributors.length > 0 && (
            <UserCard user={randomReviewer.item} size="large" />
          )}
        </LoadSection>
      </div>
    );
  }
);
