import { useAppStorage } from '@/shared/hooks/useAppStorage';
import { useOnCurrentRepoChange } from '@/shared/hooks/useOnCurrentRepoChange';
import { setLocalStorage } from '@/shared/lib';
import { IUser } from '@/shared/types/types';
import { setContributorsAction } from '@/store/entities/contributors/contributorsActionCreators';
import { fetchContributorsThunk } from '@/store/entities/contributors/thunk/fetchContributorsThunk';
import { ContributorsState } from '@/store/entities/contributors/types/contributorsActions';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useEffect } from 'react';

export const useContributorsMetaData = () => {
  const dispatch = useAppDispatch();
  const { contributors, isContributorsLoading, error }: ContributorsState =
    useAppSelector((store) => store.contributors);

  useAppStorage({
    key: 'current-contributors',
    addToStoreFromStorage: (storageContributors: IUser[]) => {
      dispatch(setContributorsAction(storageContributors));
    },
    doOnNotFromStorage: () => setLocalStorage('current-contributors', null),
  });

  useOnCurrentRepoChange('current-contributors', (currentRepo) =>
    dispatch(fetchContributorsThunk(currentRepo?.owner.login, currentRepo.name))
  );

  useEffect(() => {
    if (contributors) setLocalStorage('current-contributors', contributors);
  }, [contributors]);

  useEffect(() => {
    return () => {
      dispatch(setContributorsAction(null));
    };
  }, []);

  return {
    items: contributors,
    isLoading: isContributorsLoading,
    error: error,
  };
};
