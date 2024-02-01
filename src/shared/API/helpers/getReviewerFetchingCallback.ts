import { Dispatch, SetStateAction } from 'react';
import { getGithubUser } from '..';
import { setLocalStorage } from '@/shared/lib';

export const getReviewerFetchingCallback =
  <T>(setReviewer: Dispatch<SetStateAction<T | null>>) =>
  async (login: string) => {
    let userInfo = null;

    try {
      userInfo = await getGithubUser(login);
    } catch (error) {
      setReviewer(null);
      throw error;
    }

    setLocalStorage('current-reviewer', userInfo);
    setReviewer(userInfo);
  };
