import { getGithubUser } from '@/shared/API';
import { getLocalStorage, setLocalStorage } from '@/shared/lib';
import { IUser, ComplexError } from '@/shared/types/types';
import { Dispatch } from 'react';
import { UserActions } from '../types/userActions';
import {
  fetchUserAction,
  fetchUserSuccessAction,
  fetchUserErrorAction,
} from '../userActionCreators';

export const fetchUserThunk =
  (login: string) => async (dispatch: Dispatch<UserActions>) => {
    dispatch(fetchUserAction());

    const currentUser = getLocalStorage<IUser>('current-user');

    if (currentUser && currentUser?.login === login) {
      setLocalStorage('previous-user', currentUser);
      dispatch(fetchUserSuccessAction(currentUser));
      return;
    }

    let user;

    try {
      user = await getGithubUser(login);
    } catch (err) {
      dispatch(fetchUserErrorAction(err as ComplexError));
      return;
    }

    setLocalStorage('previous-user', currentUser);
    setLocalStorage('current-user', user);

    dispatch(fetchUserSuccessAction(user));
  };
