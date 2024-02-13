import { ReviewerState } from '@/store/entities/reviewer/types/reviewerActions';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { fetchReviewerThunk } from '@/store/entities/reviewer/thunk/fetchReviewerThunk';

export const useReviewerMetaData = () => {
  const dispatch = useAppDispatch();
  const { reviewer, isReviewerLoading, error }: ReviewerState = useAppSelector(
    (store) => store.reviewer
  );

  const reviewerFetching = () => {
    dispatch(fetchReviewerThunk());
  };

  return {
    item: reviewer,
    fetching: reviewerFetching,
    isLoading: isReviewerLoading,
    error: error,
  };
};
