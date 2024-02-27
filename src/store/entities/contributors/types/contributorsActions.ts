import { IUser, ComplexError } from '@/shared/types/types';
import {
  fetchContributorsAction,
  fetchContributorsSuccessAction,
  fetchContributorsErrorAction,
  setContributorsAction,
  setBlackListAction,
  addBlackListItemAction,
  removeBlackListItemAction,
} from '../contributorsActionCreators';

export enum ContributorsActionTypes {
  FETCH_CONTRIBUTORS = 'FETCH_CONTRIBUTORS',
  FETCH_CONTRIBUTORS_SUCCESS = 'FETCH_CONTRIBUTORS_SUCCESS',
  FETCH_CONTRIBUTORS_ERROR = 'FETCH_CONTRIBUTORS_ERROR',
  SET_CONTRIBUTORS = 'SET_CONTRIBUTORS',
  SET_BLACK_LIST = 'SET_BLACK_LIST',
  ADD_BLACK_LIST_ITEM = 'ADD_BLACK_LIST_ITEM',
  REMOVE_BLACK_LIST_ITEM = 'REMOVE_BLACK_LIST_ITEM',
}

export type ContributorsState = {
  contributors: IUser[] | null;
  blackList: IUser[];
  isContributorsLoading: boolean;
  error: ComplexError;
};

export type ContributorsActions =
  | ReturnType<typeof fetchContributorsAction>
  | ReturnType<typeof fetchContributorsSuccessAction>
  | ReturnType<typeof fetchContributorsErrorAction>
  | ReturnType<typeof setContributorsAction>
  | ReturnType<typeof setBlackListAction>
  | ReturnType<typeof addBlackListItemAction>
  | ReturnType<typeof removeBlackListItemAction>;
