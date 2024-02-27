import { combineReducers } from 'redux';
import { reposReducer } from './entities/repo/reposReducer';
import { userReducer } from './entities/user/userReducer';
import { contributorsReducer } from './entities/contributors/contributorsReducer';
import { currentRepoReducer } from './entities/currentRepo/currentRepoReducer';
import { reviewerReducer } from './entities/reviewer/reviewerReducer';

export const rootReducer = combineReducers({
  user: userReducer,
  repos: reposReducer,
  contributors: contributorsReducer,
  currentRepo: currentRepoReducer,
  reviewer: reviewerReducer,
});
