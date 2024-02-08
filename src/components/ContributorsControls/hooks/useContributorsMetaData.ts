import { getContributorsFetchingCallback } from '@/shared/API';
import { useFetching } from '@/shared/hooks/useFetching';
import { IUser } from '@/shared/types/types';
import { useState } from 'react';
import { useOnCurrentRepoChange } from '@/shared/hooks/useOnCurrentRepoChange';
import { useAppStorage } from '@/shared/hooks/useAppStorage';
import { setLocalStorage } from '@/shared/lib';

export const useContributorsMetaData = () => {
  const [contributors, setContributors] = useState<IUser[] | null>(null);

  const contributorsFetchingData = useFetching(
    getContributorsFetchingCallback(setContributors)
  );

  useAppStorage({
    key: 'current-contributors',
    setState: setContributors,
    ifNotFromStorage: () => setLocalStorage('current-contributors', null),
  });

  useOnCurrentRepoChange('current-contributors', (currentRepo) =>
    contributorsFetchingData.fetching(
      currentRepo?.owner.login,
      currentRepo.name
    )
  );

  const addContributor = (user: IUser) => {
    setContributors((prevList) => prevList && [...prevList, user]);
  };

  const removeContributor = (user: IUser) => {
    setContributors(
      (prevList) =>
        prevList &&
        prevList.filter((currentUser) => currentUser.login !== user.login)
    );
  };

  return {
    items: contributors,
    isLoading: contributorsFetchingData.isLoading,
    error: contributorsFetchingData.error,

    fetching: contributorsFetchingData.fetching,
    add: addContributor,
    remove: removeContributor,
  };
};
