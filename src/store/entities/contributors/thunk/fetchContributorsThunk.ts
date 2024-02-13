import { setLocalStorage } from '@/shared/lib';
import { Dispatch } from 'react';
import {
  fetchContributorsErrorAction,
  fetchContributorsSuccessAction,
} from '../contributorsActionCreators';
import { ContributorsActions } from '../types/contributorsActions';
import { getGithubContributors } from '@/shared/API';
import { RootState } from '@/store/store';

export const fetchContributorsThunk =
  () =>
  async (
    dispatch: Dispatch<ContributorsActions>,
    getState: () => RootState
  ) => {
    const { user } = getState().user;
    const { currentRepo } = getState().currentRepo;

    if (!user || !currentRepo) return;

    const errorMessage = 'There are no contributors to this repositories yet.';
    let contributors;

    try {
      contributors = await getGithubContributors(user.login, currentRepo.name);
    } catch (err) {
      dispatch(fetchContributorsErrorAction(new Error(errorMessage)));
      return;
    }

    setLocalStorage('current-contributors', contributors);
    dispatch(fetchContributorsSuccessAction(contributors));
  };
