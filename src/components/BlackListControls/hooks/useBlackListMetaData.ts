import { ISearchEntity, IUser } from '@/shared/types/types';
import { useCallback, useEffect } from 'react';
import { useOnCurrentRepoChange } from '@/shared/hooks/useOnCurrentRepoChange';
import { useAppStorage } from '@/shared/hooks/useAppStorage';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import {
  addBlackListItemAction,
  removeBlackListItemAction,
  setBlackListAction,
} from '@/store/entities/contributors/contributorsActionCreators';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { ContributorsState } from '@/store/entities/contributors/types/contributorsActions';
import { setLocalStorage } from '@/shared/lib';

export const useBlackListMetaData = () => {
  const dispatch = useAppDispatch();
  const { blackList }: ContributorsState = useAppSelector(
    (store) => store.contributors
  );

  const addBlackListItem = useCallback((_: string, user: ISearchEntity) => {
    dispatch(addBlackListItemAction(user as IUser));
  }, []);
  const removeBlackListItem = (user: IUser) => {
    dispatch(removeBlackListItemAction(user));
  };

  useAppStorage({
    key: 'current-blacklist',
    addToStoreFromStorage: (storageBlackList: IUser[]) => {
      dispatch(setBlackListAction(storageBlackList));
    },
  });

  useOnCurrentRepoChange('current-blacklist', () =>
    dispatch(setBlackListAction([]))
  );

  useEffect(() => {
    if (blackList) setLocalStorage('current-blacklist', blackList);
  }, [blackList]);

  return {
    items: blackList,
    add: addBlackListItem,
    remove: removeBlackListItem,
  };
};
