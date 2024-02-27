import { ComplexError, IUser } from '@/shared/types/types';
import { UserActionTypes } from './types/userActions';

export const fetchUserAction = () =>
  ({
    type: UserActionTypes.FETCH_USER,
  } as const);

export const fetchUserSuccessAction = (user: IUser | null) =>
  ({
    type: UserActionTypes.FETCH_USER_SUCCESS,
    payload: { user },
  } as const);

export const fetchUserErrorAction = (error: ComplexError) =>
  ({
    type: UserActionTypes.FETCH_USER_ERROR,
    payload: { error },
  } as const);

export const setUserAction = (user: IUser | null) =>
  ({
    type: UserActionTypes.SET_USER,
    payload: { user },
  } as const);
