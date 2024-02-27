import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './rootReducer';
import { asyncActionsMiddleware } from './middlwares/asyncActionsMiddleware';

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(asyncActionsMiddleware)
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
