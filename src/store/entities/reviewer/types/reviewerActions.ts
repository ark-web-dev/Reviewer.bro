import { IUser, ComplexError } from '@/shared/types/types';
import {
  fetchReviewerAction,
  fetchReviewerSuccessAction,
  fetchReviewerErrorAction,
  setReviewerAction,
} from '../reviewerActionCreators';

export enum ReviewerActionTypes {
  FETCH_REVIEWER = 'FETCH_REVIEWER',
  FETCH_REVIEWER_SUCCESS = 'FETCH_REVIEWER_SUCCESS',
  FETCH_REVIEWER_ERROR = 'FETCH_REVIEWER_ERROR',
  SET_REVIEWER = 'SET_REVIEWER',
}

export type ReviewerState = {
  reviewer: IUser | null;
  isReviewerLoading: boolean;
  error: ComplexError;
};

export type ReviewerActions =
  | ReturnType<typeof fetchReviewerAction>
  | ReturnType<typeof fetchReviewerSuccessAction>
  | ReturnType<typeof fetchReviewerErrorAction>
  | ReturnType<typeof setReviewerAction>;
