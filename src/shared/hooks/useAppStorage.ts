import { getLocalStorage } from '@/shared/lib';
import { useEffect } from 'react';
import { IUser } from '../types/types';

type AppStorageProps<T> = {
  key: string;
  setState: React.Dispatch<React.SetStateAction<T>>;
  ifNotFromStorage?: () => void;
  unmount?: () => void;
};

export const useAppStorage = <T>({
  key,
  setState,
  ifNotFromStorage,
  unmount,
}: AppStorageProps<T>) => {
  useEffect(() => {
    const currentUser = getLocalStorage<IUser>('current-user');
    const previousUser = getLocalStorage<IUser>('previous-user');
    const currentValue = getLocalStorage<T>(key);

    if (
      currentValue &&
      (!previousUser || currentUser?.login === previousUser?.login)
    ) {
      setState(currentValue);
    } else {
      ifNotFromStorage?.();
    }

    return () => {
      unmount?.();
    };
  }, []);
};
