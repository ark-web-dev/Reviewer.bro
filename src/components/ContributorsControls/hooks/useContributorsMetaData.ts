import { getReviewerFetchingCallback } from '@/shared/API';
import { useFetching } from '@/shared/hooks/useFetching';
import { setLocalStorage } from '@/shared/lib';
import { IUser, IBlackList } from '@/shared/types/types';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useContributorsStorage } from './useContributorsStorage';

export const useContributorsMetaData = (contributors: IUser[]) => {
  const [blackList, setBlackList] = useState<IBlackList | null>(null);
  const [randomReviewer, setRandomReviewer] = useState<IUser | null>(null);
  const blackListArray = Object.keys(blackList || {});

  useEffect(() => {
    setBlackList(null);
    setRandomReviewer(null);
  }, [contributors]);

  useContributorsStorage(setBlackList, setRandomReviewer);

  const reviewerFetchingData = useFetching(
    getReviewerFetchingCallback(setRandomReviewer),
    0
  );

  const filteredContributors = useMemo(
    () => contributors.filter((el) => !blackList?.[el.login]),
    [blackList, contributors]
  );

  const addBlackListItem = useCallback((name: string) => {
    setBlackList((prevList) => {
      const newList = { ...prevList, [name]: true };

      setLocalStorage('current-blacklist', newList);
      return newList;
    });
  }, []);

  const deleteBlackListItem = (name: string) => {
    setBlackList(({ ...newList }) => {
      delete newList[name];

      setLocalStorage('current-blacklist', newList);
      return newList;
    });
  };

  return {
    filteredContributors: {
      items: filteredContributors,
      length: filteredContributors.length,
    },
    randomReviewer: {
      item: randomReviewer,
      fetching: reviewerFetchingData.fetching,
      isLoading: reviewerFetchingData.isLoading,
      error: reviewerFetchingData.error,
    },
    blackList: {
      items: blackListArray,
      add: addBlackListItem,
      delete: deleteBlackListItem,
    },
  };
};
