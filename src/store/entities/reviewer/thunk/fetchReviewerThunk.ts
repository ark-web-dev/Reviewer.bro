import { setLocalStorage } from '@/shared/lib';
import { Dispatch } from 'react';
import {
  fetchReviewerErrorAction,
  fetchReviewerSuccessAction,
} from '../reviewerActionCreators';
import { ReviewerActions } from '../types/reviewerActions';
import { getGithubUser } from '@/shared/API';
import { ComplexError } from '@/shared/types/types';

export const fetchReviewerThunk =
  (login: string) => async (dispatch: Dispatch<ReviewerActions>) => {
    let reviewer;

    try {
      reviewer = await getGithubUser(login);
    } catch (err) {
      dispatch(fetchReviewerErrorAction(err as ComplexError));
      return;
    }

    setLocalStorage('current-reviewer', reviewer);
    dispatch(fetchReviewerSuccessAction(reviewer));
  };
