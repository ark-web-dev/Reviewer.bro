import { setLocalStorage } from '@/shared/lib';
import { ComplexError } from '@/shared/types/types';
import { Dispatch } from 'react';
import {
  fetchReposSuccessAction,
  fetchReposErrorAction,
} from '../reposActionCreators';
import { ReposActions } from '../types/reposActions';
import { getGithubUserRepos } from '@/shared/API';

export const fetchReposThunk =
  (login: string) => async (dispatch: Dispatch<ReposActions>) => {
    let repos;

    try {
      repos = await getGithubUserRepos(login);
    } catch (err) {
      dispatch(fetchReposErrorAction(err as ComplexError));
      return;
    }

    setLocalStorage('current-repos', repos);

    dispatch(fetchReposSuccessAction(repos));
  };
