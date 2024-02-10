import { UserState, UserActions, UserActionTypes } from './types/userActions';

const initialState: UserState = {
  user: null,
  isUserLoading: false,
  error: null,
};

export const userReducer = (
  state: UserState = initialState,
  action: UserActions
): UserState => {
  switch (action?.type) {
    case UserActionTypes.FETCH_USER:
      return {
        ...state,
        user: null,
        isUserLoading: true,
      };
    case UserActionTypes.FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        isUserLoading: false,
        error: null,
      };
    case UserActionTypes.FETCH_USER_ERROR:
      return {
        ...state,
        isUserLoading: false,
        error: action.payload.error,
      };
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};
