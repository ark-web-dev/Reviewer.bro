import { IRepo, ComplexError } from '@/shared/types/types';
import {
  fetchReposAction,
  fetchReposSuccessAction,
  fetchReposErrorAction,
} from '../reposActionCreators';

export enum ReposActionTypes {
  FETCH_REPOS = 'FETCH_REPOS',
  FETCH_REPOS_SUCCESS = 'FETCH_REPOS_SUCCESS',
  FETCH_REPOS_ERROR = 'FETCH_REPOS_ERROR',
}

export type ReposState = {
  repos: IRepo[] | null;
  isReposLoading: boolean;
  error: ComplexError;
};

export type ReposActions =
  | ReturnType<typeof fetchReposAction>
  | ReturnType<typeof fetchReposSuccessAction>
  | ReturnType<typeof fetchReposErrorAction>;
