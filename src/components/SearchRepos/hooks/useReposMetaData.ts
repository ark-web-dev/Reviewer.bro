import { useAppStorage } from '@/shared/hooks/useAppStorage';
import { IRepo, ISearchEntity } from '@/shared/types/types';
import { setCurrentRepoAction } from '@/store/entities/currentRepo/currentRepoActionCreators';
import { setReposAction } from '@/store/entities/repo/reposActionCreators';
import { fetchReposThunk } from '@/store/entities/repo/thunk/fetchReposThunk';
import { ReposState } from '@/store/entities/repo/types/reposActions';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useEffect } from 'react';

export const useReposMetaData = () => {
  const dispatch = useAppDispatch();
  const { repos, isReposLoading, error }: ReposState = useAppSelector(
    (store) => store.repos
  );

  useAppStorage({
    key: 'current-repos',
    addToStoreFromStorage: (storageRepos: IRepo[]) => {
      dispatch(setReposAction(storageRepos));
    },
    doOnNotFromStorage: () => {
      dispatch(setCurrentRepoAction(null));
      dispatch(fetchReposThunk());
    },
  });

  useEffect(() => {
    return () => {
      dispatch(setCurrentRepoAction(null));
    };
  }, []);

  return {
    items: repos,
    isLoading: isReposLoading,
    error: error,
    setCurrentRepo: (_: string, repo: ISearchEntity) =>
      dispatch(setCurrentRepoAction(repo as IRepo)),
  };
};
