import { getGithubUser } from '@/shared/API';
import { ComplexError } from '@/shared/types/types';
import { Dispatch } from 'react';
import { UserActions } from '../types/userActions';
import {
  fetchUserAction,
  fetchUserSuccessAction,
  fetchUserErrorAction,
} from '../userActionCreators';

export const fetchUserThunk =
  (login: string) => async (dispatch: Dispatch<UserActions>) => {
    let user;

    dispatch(fetchUserAction());

    try {
      user = await getGithubUser(login);
    } catch (err) {
      dispatch(fetchUserErrorAction(err as ComplexError));
      return;
    }

    dispatch(fetchUserSuccessAction(user));
  };
