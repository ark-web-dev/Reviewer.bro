import { setLocalStorage } from '@/shared/lib';
import { Dispatch } from 'react';
import {
  fetchContributorsErrorAction,
  fetchContributorsSuccessAction,
} from '../contributorsActionCreators';
import { ContributorsActions } from '../types/contributorsActions';
import { getGithubContributors } from '@/shared/API';

export const fetchContributorsThunk =
  (login: string, repoName: string) =>
  async (dispatch: Dispatch<ContributorsActions>) => {
    const errorMessage = 'There are no contributors to this repositories yet.';
    let contributors;

    try {
      contributors = await getGithubContributors(login, repoName);
    } catch (err) {
      dispatch(fetchContributorsErrorAction(new Error(errorMessage)));
      return;
    }

    setLocalStorage('current-contributors', contributors);
    dispatch(fetchContributorsSuccessAction(contributors));
  };
