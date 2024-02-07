import React from 'react';
import codeIcon from '@/shared/assets/icons/code-icon.svg?react';
import bookIcon from '@/shared/assets/icons/book-icon.svg?react';
import warningIcon from '@/shared/assets/icons/warn-icon.svg?react';
import { SearchBox } from '../SearchBox/SearchBox';
import { LoadHandlingProvider, ShowMessage } from '@/shared/ui-components';
import { useReposMetaData } from './hooks/useReposMetaData';
import { IRepo } from '@/shared/types/types';

export interface SearchReposProps {
  userLogin: string;
}

export const SearchRepos: React.FC<SearchReposProps> = ({ userLogin }) => {
  const repos = useReposMetaData(userLogin);

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
      loadingMessage="Loading Repositories...">
      {repos.items && (
        <SearchBox
          searchList={repos.items}
          onListItemClick={(_, repo) => repos.setCurrentRepo(repo as IRepo)}
          placeholder="Search Repository"
          searchInputSvgIcon={codeIcon}
          listItemSvgIcon={bookIcon}
        />
      )}
    </LoadHandlingProvider>
  );
};
