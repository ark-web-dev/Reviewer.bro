import {
  ContributorsState,
  ContributorsActions,
  ContributorsActionTypes,
} from './types/contributorsActions';

const initialState: ContributorsState = {
  contributors: null,
  blackList: [],
  isContributorsLoading: false,
  error: null,
};

export const contributorsReducer = (
  state: ContributorsState = initialState,
  action: ContributorsActions
): ContributorsState => {
  switch (action?.type) {
    case ContributorsActionTypes.FETCH_CONTRIBUTORS:
      return {
        ...state,
        contributors: null,
        isContributorsLoading: true,
      };
    case ContributorsActionTypes.FETCH_CONTRIBUTORS_SUCCESS:
      return {
        ...state,
        contributors: action.payload.contributors,
        isContributorsLoading: false,
        error: null,
      };
    case ContributorsActionTypes.FETCH_CONTRIBUTORS_ERROR:
      return {
        ...state,
        isContributorsLoading: false,
        error: action.payload.error,
      };
    case ContributorsActionTypes.SET_CONTRIBUTORS:
      return {
        ...state,
        contributors: action.payload.contributors,
      };
    case ContributorsActionTypes.SET_BLACK_LIST:
      return {
        ...state,
        blackList: action.payload.blackList,
      };
    case ContributorsActionTypes.ADD_BLACK_LIST_ITEM:
      return {
        ...state,
        contributors:
          state.contributors &&
          state.contributors.filter(
            (currentUser) =>
              currentUser.login !== action.payload.blackListItem.login
          ),
        blackList: [...(state.blackList || []), action.payload.blackListItem],
      };
    case ContributorsActionTypes.REMOVE_BLACK_LIST_ITEM:
      return {
        ...state,
        contributors: [
          ...(state.contributors || []),
          action.payload.blackListItem,
        ],
        blackList:
          state.blackList &&
          state.blackList.filter(
            (currentUser) =>
              currentUser.login !== action.payload.blackListItem.login
          ),
      };
    default:
      return state;
  }
};
