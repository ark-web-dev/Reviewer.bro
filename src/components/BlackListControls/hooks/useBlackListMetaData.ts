import { setLocalStorage } from '@/shared/lib';
import { IUser } from '@/shared/types/types';
import { useState, useCallback } from 'react';
import { useOnCurrentRepoChange } from '@/shared/hooks/useOnCurrentRepoChange';
import { useAppStorage } from '@/shared/hooks/useAppStorage';

export const useBlackListMetaData = (
  addContributor: (user: IUser) => void,
  removeContributor: (user: IUser) => void
) => {
  const [blackList, setBlackList] = useState<IUser[]>([]);

  useAppStorage({
    key: 'current-blacklist',
    setState: setBlackList,
  });

  useOnCurrentRepoChange('current-blacklist', () => setBlackList([]));

  const addBlackListItem = useCallback((user: IUser) => {
    setBlackList((prevList) => {
      const newList = [...prevList, user];
      setLocalStorage('current-blacklist', newList);
      return newList;
    });

    removeContributor(user);
  }, []);

  const removeBlackListItem = (user: IUser) => {
    setBlackList((prevList) => {
      const newList = prevList.filter(
        (currentUser) => currentUser.login !== user.login
      );
      setLocalStorage('current-blacklist', newList);
      return newList;
    });

    addContributor(user);
  };

  return {
    items: blackList,
    add: addBlackListItem,
    remove: removeBlackListItem,
  };
};
