import { getLocalStorage } from '@/shared/lib';
import { IUser, IRepo } from '@/shared/types/types';
import { useEffect } from 'react';

export const useAppStorage = (
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  setRepos: React.Dispatch<React.SetStateAction<IRepo[] | null>>,
  setContributors: React.Dispatch<React.SetStateAction<IUser[] | null>>
) => {
  useEffect(() => {
    const currentUser: IUser | null = getLocalStorage('current-user');
    const currentRepos: IRepo[] | null = getLocalStorage('current-repos');
    const currentContributors: IUser[] | null = getLocalStorage(
      'current-contributors'
    );

    if (currentUser) {
      setUser(currentUser);
    }
    if (currentRepos) {
      setRepos(currentRepos);
    }
    if (currentContributors) {
      setContributors(currentContributors);
    }
  }, []);
};
