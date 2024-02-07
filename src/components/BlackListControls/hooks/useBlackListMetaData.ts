import { setLocalStorage } from '@/shared/lib';
import { IUser } from '@/shared/types/types';
import { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { useOnCurrentRepoChange } from '@/shared/hooks/useOnCurrentRepoChange';
import { useAppStorage } from '@/shared/hooks/useAppStorage';

export const useBlackListMetaData = (
  setContributors: Dispatch<SetStateAction<IUser[] | null>>
) => {
  const [blackList, setBlackList] = useState<IUser[] | null>(null);

  useAppStorage({
    key: 'current-blacklist',
    setState: setBlackList,
  });

  useOnCurrentRepoChange('current-blacklist', () => setBlackList(null));

  const addBlackListItem = useCallback((user: IUser) => {
    setBlackList((prevList) => {
      const newList = [...(prevList || []), user];
      setLocalStorage('current-blacklist', newList);
      return newList;
    });

    setContributors(
      (prevList) =>
        prevList &&
        prevList?.filter((currentUser) => currentUser.login !== user.login)
    );
  }, []);

  const deleteBlackListItem = (user: IUser) => {
    setBlackList((prevList) => {
      const newList =
        prevList?.filter((currentUser) => currentUser.login !== user.login) ||
        [];
      setLocalStorage('current-blacklist', newList);
      return newList;
    });

    setContributors((prevList) => prevList && [...prevList, user]);
  };

  return {
    items: blackList || [],
    add: addBlackListItem,
    delete: deleteBlackListItem,
  };
};
