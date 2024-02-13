import { Dispatch } from 'react';
import {
  fetchContributorsErrorAction,
  fetchContributorsSuccessAction,
} from '../contributorsActionCreators';
import { ContributorsActions } from '../types/contributorsActions';
import { getGithubContributors } from '@/shared/API';
import { RootState } from '@/store/store';
import { getLocalStorage } from '@/shared/lib';
import { BlackListStorage, IUser } from '@/shared/types/types';

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
    let contributors: IUser[];

    try {
      contributors = await getGithubContributors(user.login, currentRepo.name);
    } catch (err) {
      dispatch(fetchContributorsErrorAction(new Error(errorMessage)));
      return;
    }

    const blackList = getLocalStorage<BlackListStorage>('current-blacklist');

    if (blackList?.items.length) {
      const blackListSet = blackList?.items.reduce((set, current) => {
        set.add(current.login);
        return set;
      }, new Set());

      contributors = contributors.filter(
        (contributor) => !blackListSet.has(contributor.login)
      );
    }

    dispatch(fetchContributorsSuccessAction(contributors));
  };
