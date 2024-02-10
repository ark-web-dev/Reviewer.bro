import { useEffect } from 'react';
import { setLocalStorage } from '../lib';
import { IRepo } from '../types/types';
import { useAppSelector } from '@/store/hooks/useAppSelector';

export const useOnCurrentRepoChange = (
  localStorageKey: string,
  callback: (currentRepo: IRepo) => void
) => {
  const { currentRepo } = useAppSelector((store) => store.currentRepo);

  useEffect(() => {
    if (currentRepo) {
      setLocalStorage(localStorageKey, null);
      callback(currentRepo);
    }
  }, [currentRepo]);
};
