import { useContext, useEffect } from 'react';
import { CurrentRepoContext } from '../context/CurrentRepoContext';
import { setLocalStorage } from '../lib';
import { IRepo } from '../types/types';

export const useOnCurrentRepoChange = (
  localStorageKey: string,
  callback: (currentRepo: IRepo) => void
) => {
  const [currentRepo] = useContext(CurrentRepoContext);

  useEffect(() => {
    if (currentRepo) {
      setLocalStorage(localStorageKey, null);
      callback(currentRepo);
    }
  }, [currentRepo]);
};
