import { getUserFetchingCallback } from '@/shared/API';
import { useFetching } from '@/shared/hooks/useFetching';
import { IUser } from '@/shared/types/types';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '@/shared/lib';

export const useUserMetaData = () => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const currentUser = getLocalStorage<IUser>('current-user');

    if (currentUser) {
      setUser(currentUser);
      setLocalStorage('previous-user', currentUser);
    }
  }, []);

  const userFetchingData = useFetching(getUserFetchingCallback(setUser));

  return {
    item: user,
    fetching: userFetchingData.fetching,
    isLoading: userFetchingData.isLoading,
    error: userFetchingData.error,
  };
};
