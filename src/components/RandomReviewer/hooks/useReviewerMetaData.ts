import { getReviewerFetchingCallback } from '@/shared/API';
import { useFetching } from '@/shared/hooks/useFetching';
import { IUser } from '@/shared/types/types';
import { useState } from 'react';
import { useOnCurrentRepoChange } from '@/shared/hooks/useOnCurrentRepoChange';
import { useAppStorage } from '@/shared/hooks/useAppStorage';

export const useReviewerMetaData = () => {
  const [randomReviewer, setRandomReviewer] = useState<IUser | null>(null);

  const reviewerFetchingData = useFetching(
    getReviewerFetchingCallback(setRandomReviewer),
    0
  );

  useAppStorage({
    key: 'current-reviewer',
    setState: setRandomReviewer,
  });

  useOnCurrentRepoChange('current-reviewer', () => setRandomReviewer(null));

  return {
    item: randomReviewer,
    fetching: reviewerFetchingData.fetching,
    isLoading: reviewerFetchingData.isLoading,
    error: reviewerFetchingData.error,
  };
};
