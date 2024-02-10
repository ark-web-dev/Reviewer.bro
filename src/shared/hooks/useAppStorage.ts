import { getLocalStorage } from '@/shared/lib';
import { useEffect } from 'react';
import { IUser } from '../types/types';

type AppStorageProps<T> = {
  key: string;
  addToStoreFromStorage: (value: T) => void;
  doOnNotFromStorage?: () => void;
};

export const useAppStorage = <T>({
  key,
  addToStoreFromStorage,
  doOnNotFromStorage,
}: AppStorageProps<T>) => {
  useEffect(() => {
    const currentUser = getLocalStorage<IUser>('current-user');
    const previousUser = getLocalStorage<IUser>('previous-user');
    const currentValue = getLocalStorage<T>(key);

    if (
      currentValue &&
      (!previousUser || currentUser?.login === previousUser?.login)
    ) {
      addToStoreFromStorage(currentValue);
    } else {
      doOnNotFromStorage?.();
    }
  }, []);
};
