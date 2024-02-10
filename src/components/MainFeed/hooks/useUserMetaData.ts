import { debounce, getLocalStorage, setLocalStorage } from '@/shared/lib';
import { IUser } from '@/shared/types/types';
import { fetchUserThunk } from '@/store/entities/user/thunk/fetchUserThunk';
import { UserState } from '@/store/entities/user/types/userActions';
import { setUserAction } from '@/store/entities/user/userActionCreators';
import { useAppDispatch } from '@/store/hooks/useAppDispatch';
import { useAppSelector } from '@/store/hooks/useAppSelector';
import { useMemo, useEffect } from 'react';

export const useUserMetaData = () => {
  const dispatch = useAppDispatch();
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
        dispatch(fetchUserThunk(login));
      }, 1500),
    []
  );

  useEffect(() => {
    const currentUser = getLocalStorage<IUser>('current-user');

    if (currentUser) {
      dispatch(setUserAction(currentUser));
      setLocalStorage('previous-user', currentUser);
    }
  }, []);

  return {
    item: user,
    fetching: debouncedFetchingUser,
    isLoading: isUserLoading,
    error: error,
  };
};
