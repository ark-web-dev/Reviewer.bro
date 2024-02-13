import { ComplexError, IUser } from '@/shared/types/types';
import { ReviewerActionTypes } from './types/reviewerActions';

export const fetchReviewerAction = () =>
  ({
    type: ReviewerActionTypes.FETCH_REVIEWER,
  } as const);

export const fetchReviewerSuccessAction = (reviewer: IUser | null) =>
  ({
    type: ReviewerActionTypes.FETCH_REVIEWER_SUCCESS,
    payload: { reviewer },
  } as const);

export const fetchReviewerErrorAction = (error: ComplexError) =>
  ({
    type: ReviewerActionTypes.FETCH_REVIEWER_ERROR,
    payload: { error },
  } as const);
