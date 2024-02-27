import {
  ReviewerState,
  ReviewerActions,
  ReviewerActionTypes,
} from './types/reviewerActions';

const initialState: ReviewerState = {
  reviewer: null,
  isReviewerLoading: false,
  error: null,
};

export const reviewerReducer = (
  state: ReviewerState = initialState,
  action: ReviewerActions
): ReviewerState => {
  switch (action?.type) {
    case ReviewerActionTypes.FETCH_REVIEWER:
      return {
        ...state,
        reviewer: null,
        isReviewerLoading: true,
      };
    case ReviewerActionTypes.FETCH_REVIEWER_SUCCESS:
      return {
        ...state,
        reviewer: action.payload.reviewer,
        isReviewerLoading: false,
        error: null,
      };
    case ReviewerActionTypes.FETCH_REVIEWER_ERROR:
      return {
        ...state,
        isReviewerLoading: false,
        error: action.payload.error,
      };
    case ReviewerActionTypes.SET_REVIEWER:
      return {
        ...state,
        reviewer: action.payload.reviewer,
      };
    default:
      return state;
  }
};
