import { IRepo } from '@/shared/types/types';
import { CurrentRepoActionTypes } from './types/currentRepoActions';

export const setCurrentRepoAction = (currentRepo: IRepo | null) =>
  ({
    type: CurrentRepoActionTypes.SET_CURRENT_REPO,
    payload: { currentRepo },
  } as const);
