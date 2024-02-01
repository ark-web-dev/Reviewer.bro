import { ComplexError } from '@/shared/types/types';
import { Dispatch, SetStateAction } from 'react';
import { getGithubUser } from '..';
import { setLocalStorage } from '@/shared/lib';

export const getUserFetchingCallback =
  <U, R, C>(
    setUser: Dispatch<SetStateAction<U | null>>,
    setRepos: Dispatch<SetStateAction<R | null>>,
    setContributors: Dispatch<SetStateAction<C | null>>,
    setContributorsError: Dispatch<SetStateAction<ComplexError>>
  ) =>
  async (value: string) => {
    setRepos(null);
    setContributors(null);
    setContributorsError(null);

    if (!value.length) {
      setUser(null);
      return;
    }

    let userInfo = null;

    try {
      userInfo = await getGithubUser(value);
    } catch (error) {
      setUser(null);
      throw error;
    }

    setLocalStorage('current-user', userInfo);
    setLocalStorage('current-repos', null);
    setLocalStorage('current-contributors', null);
    setLocalStorage('current-blacklist', null);
    setLocalStorage('current-reviewer', null);
    setUser(userInfo);
  };
