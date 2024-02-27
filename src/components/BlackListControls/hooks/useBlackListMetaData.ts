import { BlackListStorage, ISearchEntity, IUser } from '@/shared/types/types';
import { useCallback, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import {
  addBlackListItemAction,
  removeBlackListItemAction,
  setBlackListAction,
} from '@/store/entities/contributors/contributorsActionCreators';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { ContributorsState } from '@/store/entities/contributors/types/contributorsActions';
import { getLocalStorage, setLocalStorage } from '@/shared/lib';

export const useBlackListMetaData = () => {
  const dispatch = useAppDispatch();
  const { currentRepo } = useAppSelector((store) => store.currentRepo);
  const { blackList }: ContributorsState = useAppSelector(
    (store) => store.contributors
  );

  const addBlackListItem = useCallback((_: string, user: ISearchEntity) => {
    dispatch(addBlackListItemAction(user as IUser));
  }, []);
  const removeBlackListItem = (user: IUser) => {
    dispatch(removeBlackListItemAction(user));
  };

  useEffect(() => {
    const blackList = getLocalStorage<BlackListStorage>('current-blacklist');

    if (blackList?.relatedRepoName === currentRepo?.name && blackList?.items) {
      dispatch(setBlackListAction(blackList?.items));
    } else {
      setLocalStorage('current-blacklist', null);
      dispatch(setBlackListAction([]));
    }
  }, [currentRepo]);

  useEffect(() => {
    if (blackList)
      setLocalStorage('current-blacklist', {
        relatedRepoName: currentRepo?.name,
        items: blackList,
      });
  }, [blackList]);

  return {
    items: blackList,
    add: addBlackListItem,
    remove: removeBlackListItem,
  };
};
