import {
  getContributorsFetchingCallback,
  getUserFetchingCallback,
  getReposFetchingCallback,
} from '@/shared/API';
import { useFetching } from '@/shared/hooks/useFetching';
import { IUser, IRepo } from '@/shared/types/types';
import { useState } from 'react';
import { useAppStorage } from './useAppStorage';

export const useMetaData = () => {
  const [user, setUser] = useState<IUser | null>(null);
  const [repos, setRepos] = useState<IRepo[] | null>(null);
  const [contributors, setContributors] = useState<IUser[] | null>(null);

  useAppStorage(setUser, setRepos, setContributors);

  const contributorsFetchingData = useFetching(
    getContributorsFetchingCallback(setContributors)
  );
  const userFetchingData = useFetching(
    getUserFetchingCallback(
      setUser,
      setRepos,
      setContributors,
      contributorsFetchingData.setError
    )
  );
  const reposFetchingData = useFetching(
    getReposFetchingCallback(setRepos, setContributors)
  );

  return {
    user: {
      item: user,
      fetching: userFetchingData.fetching,
      isLoading: userFetchingData.isLoading,
      error: userFetchingData.error,
    },
    repos: {
      items: repos,
      fetching: reposFetchingData.fetching,
      isLoading: reposFetchingData.isLoading,
      error: reposFetchingData.error,
    },
    contributors: {
      items: contributors,
      fetching: contributorsFetchingData.fetching,
      isLoading: contributorsFetchingData.isLoading,
      error: contributorsFetchingData.error,
    },
  };
};
