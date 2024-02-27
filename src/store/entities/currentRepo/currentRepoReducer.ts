import {
  CurrentRepoState,
  CurrentRepoActions,
  CurrentRepoActionTypes,
} from './types/currentRepoActions';

const initialState: CurrentRepoState = {
  currentRepo: null,
};

export const currentRepoReducer = (
  state: CurrentRepoState = initialState,
  action: CurrentRepoActions
): CurrentRepoState => {
  switch (action?.type) {
    case CurrentRepoActionTypes.SET_CURRENT_REPO:
      return {
        currentRepo: action.payload.currentRepo,
      };
    default:
      return state;
  }
};
