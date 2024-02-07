import { getReposFetchingCallback } from '@/shared/API';
import { useFetching } from '@/shared/hooks/useFetching';
import { IRepo } from '@/shared/types/types';
import { useContext, useState } from 'react';
import { CurrentRepoContext } from '@/shared/context/CurrentRepoContext';
import { useAppStorage } from '@/shared/hooks/useAppStorage';

export const useReposMetaData = (userLogin: string) => {
  const [repos, setRepos] = useState<IRepo[] | null>(null);
  const reposFetchingData = useFetching(getReposFetchingCallback(setRepos));
  const setCurrentRepo = useContext(CurrentRepoContext)[1];

  useAppStorage({
    key: 'current-repos',
    setState: setRepos,
    ifNotFromStorage: () => {
      setCurrentRepo(null);
      reposFetchingData.fetching(userLogin);
    },
    unmount: () => setCurrentRepo(null),
  });

  return {
    items: repos,
    fetching: reposFetchingData.fetching,
    isLoading: reposFetchingData.isLoading,
    error: reposFetchingData.error,
    setCurrentRepo: setCurrentRepo,
  };
};
