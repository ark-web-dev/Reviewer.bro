import { debounce, getLocalStorage, setLocalStorage } from '@/shared/lib';
import { fetchUserThunk } from '@/store/entities/user/thunk/fetchUserThunk';
import { UserState } from '@/store/entities/user/types/userActions';
import { setUserAction } from '@/store/entities/user/userActionCreators';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useMemo, useEffect, useState, useCallback } from 'react';

export const useUserMetaData = () => {
  const dispatch = useAppDispatch();
  const [userInputValue, setUserInputValue] = useState('');
  const { user, isUserLoading, error }: UserState = useAppSelector(
    (store) => store.user
  );

  const debouncedFetchingUser = useMemo(
    () =>
      debounce((login: string) => {
        if (!login.length) {
          dispatch(setUserAction(null));
          return;
        }
        setLocalStorage('current-user-login', login);
        dispatch(fetchUserThunk(login));
      }, 800),
    []
  );

  const fetchingUser = useCallback((value: string) => {
    setUserInputValue(value);
    debouncedFetchingUser(value);
  }, []);

  useEffect(() => {
    const currentUserLogin = getLocalStorage<string>('current-user-login');

    if (currentUserLogin) {
      setUserInputValue(currentUserLogin);
      dispatch(fetchUserThunk(currentUserLogin));
    }
  }, []);

  return {
    item: user,
    fetching: fetchingUser,
    isLoading: isUserLoading,
    error: error,
    inputValue: userInputValue,
  };
};
