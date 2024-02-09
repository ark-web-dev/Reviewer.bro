import { Dispatch, SetStateAction } from 'react';
import { getGithubUser } from '..';
import { setLocalStorage } from '@/shared/lib';
import { IUser } from '@/shared/types/types';

export const getReviewerFetchingCallback =
  (setReviewer: Dispatch<SetStateAction<IUser | null>>) =>
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
