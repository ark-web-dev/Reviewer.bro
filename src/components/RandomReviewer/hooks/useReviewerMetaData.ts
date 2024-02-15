import { ReviewerState } from '@/store/entities/reviewer/types/reviewerActions';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { fetchReviewerThunk } from '@/store/entities/reviewer/thunk/fetchReviewerThunk';
import { useEffect } from 'react';
import { setReviewerAction } from '@/store/entities/reviewer/reviewerActionCreators';

export const useReviewerMetaData = () => {
  const dispatch = useAppDispatch();
  const { currentRepo } = useAppSelector((store) => store.currentRepo);
  const { reviewer, isReviewerLoading, error }: ReviewerState = useAppSelector(
    (store) => store.reviewer
  );

  const reviewerFetching = () => {
    dispatch(fetchReviewerThunk());
  };

  useEffect(() => {
    if (currentRepo) {
      dispatch(setReviewerAction(null));
    }
  }, [currentRepo]);

  return {
    item: reviewer,
    fetching: reviewerFetching,
    isLoading: isReviewerLoading,
    error: error,
  };
};
