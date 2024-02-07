import { Dispatch, SetStateAction } from 'react';
import { getGithubContributors } from '..';
import { setLocalStorage } from '@/shared/lib';
import { IUser } from '@/shared/types/types';

export const getContributorsFetchingCallback =
  (setUserContributors: Dispatch<SetStateAction<IUser[] | null>>) =>
  async (userLogin: string, repoName: string) => {
    const errorMessage = 'There are no contributors to this repositories yet.';
    let userContributors;

    try {
      userContributors = await getGithubContributors(userLogin, repoName);
    } catch (error) {
      throw new Error(errorMessage);
    }

    setLocalStorage('current-contributors', userContributors);
    setUserContributors(userContributors);
  };
