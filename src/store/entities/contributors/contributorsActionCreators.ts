import { ComplexError, IUser } from '@/shared/types/types';
import { ContributorsActionTypes } from './types/contributorsActions';

export const fetchContributorsAction = () =>
  ({
    type: ContributorsActionTypes.FETCH_CONTRIBUTORS,
  } as const);

export const fetchContributorsSuccessAction = (contributors: IUser[] | null) =>
  ({
    type: ContributorsActionTypes.FETCH_CONTRIBUTORS_SUCCESS,
    payload: { contributors },
  } as const);

export const fetchContributorsErrorAction = (error: ComplexError) =>
  ({
    type: ContributorsActionTypes.FETCH_CONTRIBUTORS_ERROR,
    payload: { error },
  } as const);

export const setContributorsAction = (contributors: IUser[] | null) =>
  ({
    type: ContributorsActionTypes.SET_CONTRIBUTORS,
    payload: { contributors },
  } as const);

export const setBlackListAction = (blackList: IUser[]) =>
  ({
    type: ContributorsActionTypes.SET_BLACK_LIST,
    payload: { blackList },
  } as const);

export const addBlackListItemAction = (blackListItem: IUser) =>
  ({
    type: ContributorsActionTypes.ADD_BLACK_LIST_ITEM,
    payload: { blackListItem },
  } as const);

export const removeBlackListItemAction = (blackListItem: IUser) =>
  ({
    type: ContributorsActionTypes.REMOVE_BLACK_LIST_ITEM,
    payload: { blackListItem },
  } as const);
