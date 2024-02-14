import { ComplexError } from '@/shared/types/types';
import { Dispatch } from 'react';
import {
  fetchReposSuccessAction,
  fetchReposErrorAction,
  fetchReposAction,
} from '../reposActionCreators';
import { ReposActions } from '../types/reposActions';
import { getGithubUserRepos } from '@/shared/API';
import { RootState } from '@/store/store';

export const fetchReposThunk =
  () => async (dispatch: Dispatch<ReposActions>, getState: () => RootState) => {
    const { user } = getState().user;

    if (!user) return;

    dispatch(fetchReposAction());

    let repos;

    try {
      repos = await getGithubUserRepos(user.login);
    } catch (err) {
      dispatch(fetchReposErrorAction(err as ComplexError));
      return;
    }

    dispatch(fetchReposSuccessAction(repos));
  };
