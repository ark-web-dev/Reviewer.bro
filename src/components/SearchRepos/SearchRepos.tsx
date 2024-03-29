import React, { memo } from 'react';
import codeIcon from '@/shared/assets/icons/code-icon.svg?react';
import bookIcon from '@/shared/assets/icons/book-icon.svg?react';
import warningIcon from '@/shared/assets/icons/warn-icon.svg?react';
import { SearchBox } from '../SearchBox/SearchBox';
import { LoadHandlingProvider, ShowMessage } from '@/shared/ui-components';
import { useReposMetaData } from './hooks/useReposMetaData';
import { appHeights } from '@/shared/const/appHeights';

export const SearchRepos: React.FC = memo(() => {
  const repos = useReposMetaData();

  if (repos.items && !repos.items.length) {
    return (
      <ShowMessage
        message="This user does not have any repositories yet"
        iconSvg={warningIcon}
      />
    );
  }

  return (
    <LoadHandlingProvider
      isLoading={repos.isLoading}
      error={repos.error}
      loadingMessage="Loading Repositories..."
      loadHeight={appHeights.repos}
      zIndex={1}>
      {repos.items && (
        <SearchBox
          searchList={repos.items}
          onListItemClick={repos.setCurrentRepo}
          initialInputValue={repos.currentRepoName}
          placeholder="Search Repository"
          searchInputSvgIcon={codeIcon}
          listItemSvgIcon={bookIcon}
        />
      )}
    </LoadHandlingProvider>
  );
});
