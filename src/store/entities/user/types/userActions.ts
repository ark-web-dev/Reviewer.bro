import { ComplexError, IUser } from '@/shared/types/types';
import {
  fetchUserAction,
  fetchUserErrorAction,
  fetchUserSuccessAction,
  setUserAction,
} from '../userActionCreators';

export enum UserActionTypes {
  FETCH_USER = 'FETCH_User',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_ERROR = 'FETCH_USER_ERROR',
  SET_USER = 'SET_USER',
}

export type UserState = {
  user: IUser | null;
  isUserLoading: boolean;
  error: ComplexError;
};

export type UserActions =
  | ReturnType<typeof fetchUserAction>
  | ReturnType<typeof fetchUserSuccessAction>
  | ReturnType<typeof fetchUserErrorAction>
  | ReturnType<typeof setUserAction>;
