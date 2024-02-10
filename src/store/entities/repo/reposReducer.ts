import {
  ReposState,
  ReposActions,
  ReposActionTypes,
} from './types/reposActions';

const initialState: ReposState = {
  repos: null,
  isReposLoading: false,
  error: null,
};

export const reposReducer = (
  state: ReposState = initialState,
  action: ReposActions
): ReposState => {
  switch (action?.type) {
    case ReposActionTypes.FETCH_REPOS:
      return {
        ...state,
        repos: null,
        isReposLoading: true,
      };
    case ReposActionTypes.FETCH_REPOS_SUCCESS:
      return {
        ...state,
        repos: action.payload.repos,
        isReposLoading: false,
        error: null,
      };
    case ReposActionTypes.FETCH_REPOS_ERROR:
      return {
        ...state,
        isReposLoading: false,
        error: action.payload.error,
      };
    case ReposActionTypes.SET_REPOS:
      return {
        ...state,
        repos: action.payload.repos,
      };
    default:
      return state;
  }
};
