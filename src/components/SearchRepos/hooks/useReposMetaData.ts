import { getLocalStorage, setLocalStorage } from '@/shared/lib';
import { IRepo, ISearchEntity } from '@/shared/types/types';
import { setCurrentRepoAction } from '@/store/entities/currentRepo/currentRepoActionCreators';
import { fetchReposThunk } from '@/store/entities/repo/thunk/fetchReposThunk';
import { ReposState } from '@/store/entities/repo/types/reposActions';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useEffect } from 'react';

export const useReposMetaData = () => {
  const dispatch = useAppDispatch();
  const { currentRepo } = useAppSelector((store) => store.currentRepo);
  const { repos, isReposLoading, error }: ReposState = useAppSelector(
    (store) => store.repos
  );

  useEffect(() => {
    const currentRepo = getLocalStorage<IRepo>('current-repo');

    if (currentRepo) {
      dispatch(setCurrentRepoAction(currentRepo));
    } else {
      dispatch(setCurrentRepoAction(null));
    }

    dispatch(fetchReposThunk());

    return () => {
      setLocalStorage('current-repo', null);
      dispatch(setCurrentRepoAction(null));
    };
  }, []);

  return {
    items: repos,
    isLoading: isReposLoading,
    error: error,
    currentRepoName: currentRepo?.name,
    setCurrentRepo: (_: string, repo: ISearchEntity) => {
      setLocalStorage('current-repo', repo);
      dispatch(setCurrentRepoAction(repo as IRepo));
    },
  };
};
