import { IUser } from '@/shared/types/types';
import { useOnCurrentRepoChange } from '@/shared/hooks/useOnCurrentRepoChange';
import { useAppStorage } from '@/shared/hooks/useAppStorage';
import { setReviewerAction } from '@/store/entities/reviewer/reviewerActionCreators';
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

  useAppStorage({
    key: 'current-reviewer',
    addToStoreFromStorage: (storageReviewer: IUser) => {
      dispatch(setReviewerAction(storageReviewer));
    },
  });

  useOnCurrentRepoChange('current-reviewer', () =>
    dispatch(setReviewerAction(null))
  );

  return {
    item: reviewer,
    fetching: reviewerFetching,
    isLoading: isReviewerLoading,
    error: error,
  };
};
