import { getRandomNumber } from '@/shared/lib';
import { Dispatch } from 'react';
import {
  fetchReviewerErrorAction,
  fetchReviewerSuccessAction,
} from '../reviewerActionCreators';
import { ReviewerActions } from '../types/reviewerActions';
import { getGithubUser } from '@/shared/API';
import { ComplexError } from '@/shared/types/types';
import { RootState } from '@/store/store';

export const fetchReviewerThunk =
  () =>
  async (dispatch: Dispatch<ReviewerActions>, getState: () => RootState) => {
    const { contributors } = getState().contributors;

    if (!contributors) return;

    const login = contributors[getRandomNumber(0, contributors.length)].login;
    let reviewer;

    try {
      reviewer = await getGithubUser(login);
    } catch (err) {
      dispatch(fetchReviewerErrorAction(err as ComplexError));
      return;
    }

    dispatch(fetchReviewerSuccessAction(reviewer));
  };
