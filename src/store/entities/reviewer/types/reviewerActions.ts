import { IUser, ComplexError } from '@/shared/types/types';
import {
  fetchReviewerAction,
  fetchReviewerSuccessAction,
  fetchReviewerErrorAction,
} from '../reviewerActionCreators';

export enum ReviewerActionTypes {
  FETCH_REVIEWER = 'FETCH_REVIEWER',
  FETCH_REVIEWER_SUCCESS = 'FETCH_REVIEWER_SUCCESS',
  FETCH_REVIEWER_ERROR = 'FETCH_REVIEWER_ERROR',
}

export type ReviewerState = {
  reviewer: IUser | null;
  isReviewerLoading: boolean;
  error: ComplexError;
};

export type ReviewerActions =
  | ReturnType<typeof fetchReviewerAction>
  | ReturnType<typeof fetchReviewerSuccessAction>
  | ReturnType<typeof fetchReviewerErrorAction>;
