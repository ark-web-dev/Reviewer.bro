import { Dispatch, SetStateAction } from 'react';
import { getGithubUser } from '..';
import { getLocalStorage, setLocalStorage } from '@/shared/lib';
import { IUser } from '@/shared/types/types';

export const getUserFetchingCallback =
  (setUser: Dispatch<SetStateAction<IUser | null>>) =>
  async (login: string) => {
    setUser(null);

    if (!login.length) return;

    const currentUser = getLocalStorage<IUser>('current-user');

    if (currentUser && currentUser?.login === login) {
      setLocalStorage('previous-user', currentUser);
      setUser(currentUser);
      return;
    }

    const newUser = await getGithubUser(login);

    setLocalStorage('previous-user', currentUser);
    setLocalStorage('current-user', newUser);
    setUser(newUser);
  };
