import { Dispatch, SetStateAction } from 'react';
import { getGithubContributors } from '..';
import { setLocalStorage } from '@/shared/lib';

export const getContributorsFetchingCallback =
  <T>(setUserContributors: Dispatch<SetStateAction<T | null>>) =>
  async (userLogin: string, repoName: string) => {
    const errorMessage =
      'There are no contributors to this repositories yet. Please try another one.';
    let userContributors;

    try {
      userContributors = await getGithubContributors(repoName, userLogin);
    } catch (error) {
      throw new Error(errorMessage);
    }

    if (!userContributors.length) throw new Error(errorMessage);

    setLocalStorage('current-contributors', userContributors);
    setUserContributors(userContributors);
  };
