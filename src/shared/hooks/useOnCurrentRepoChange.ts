import { useEffect } from 'react';
import { setLocalStorage } from '../lib';
import { useAppSelector } from '@/store/hooks/useAppSelector';

export const useOnCurrentRepoChange = (
  localStorageKey: string,
  callback: () => void
) => {
  const { currentRepo } = useAppSelector((store) => store.currentRepo);

  useEffect(() => {
    if (currentRepo) {
      setLocalStorage(localStorageKey, null);
      callback();
    }
  }, [currentRepo]);
};
