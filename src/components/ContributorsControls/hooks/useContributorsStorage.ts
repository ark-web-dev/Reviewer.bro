import { getLocalStorage } from '@/shared/lib';
import { IUser, IBlackList } from '@/shared/types/types';
import { useEffect } from 'react';

export const useContributorsStorage = (
  setBlackList: React.Dispatch<React.SetStateAction<IBlackList | null>>,
  setRandomReviewer: React.Dispatch<React.SetStateAction<IUser | null>>
) => {
  useEffect(() => {
    const currentBlackList: IBlackList | null =
      getLocalStorage('current-blacklist');
    const currentRandomReviewer: IUser | null =
      getLocalStorage('current-reviewer');

    if (currentBlackList) {
      setBlackList(currentBlackList);
    }
    if (currentRandomReviewer) {
      setRandomReviewer(currentRandomReviewer);
    }
  }, []);
};
