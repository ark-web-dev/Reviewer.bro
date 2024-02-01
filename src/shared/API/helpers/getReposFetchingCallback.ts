import { Dispatch, SetStateAction } from 'react';
import { getGithubUserRepos } from '..';
import { setLocalStorage } from '@/shared/lib';

export const getReposFetchingCallback =
  <U, C>(
    setUserRepos: Dispatch<SetStateAction<U | null>>,
    setContributors: Dispatch<SetStateAction<C | null>>
  ) =>
  async (value: string) => {
    const userRepos = await getGithubUserRepos(value);

    if (!userRepos.length) {
      setContributors(null);
      throw new Error('This user does not have any repositories yet');
    }

    setLocalStorage('current-repos', userRepos);
    setUserRepos(userRepos);
  };
