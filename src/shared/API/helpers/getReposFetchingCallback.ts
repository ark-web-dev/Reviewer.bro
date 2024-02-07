import { Dispatch, SetStateAction } from 'react';
import { getGithubUserRepos } from '..';
import { setLocalStorage } from '@/shared/lib';
import { IRepo } from '@/shared/types/types';

export const getReposFetchingCallback =
  (setUserRepos: Dispatch<SetStateAction<IRepo[] | null>>) =>
  async (value: string) => {
    const userRepos = await getGithubUserRepos(value);

    setLocalStorage('current-repos', userRepos);
    setUserRepos(userRepos);
  };
