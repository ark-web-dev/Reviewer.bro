import { ComplexError, IRepo } from '@/shared/types/types';
import { ReposActionTypes } from './types/reposActions';

export const fetchReposAction = () =>
  ({
    type: ReposActionTypes.FETCH_REPOS,
  } as const);

export const fetchReposSuccessAction = (repos: IRepo[] | null) =>
  ({
    type: ReposActionTypes.FETCH_REPOS_SUCCESS,
    payload: { repos },
  } as const);

export const fetchReposErrorAction = (error: ComplexError) =>
  ({
    type: ReposActionTypes.FETCH_REPOS_ERROR,
    payload: { error },
  } as const);
