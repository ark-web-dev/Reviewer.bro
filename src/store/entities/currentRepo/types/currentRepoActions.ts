import { IRepo } from '@/shared/types/types';
import { setCurrentRepoAction } from '../currentRepoActionCreators';

export enum CurrentRepoActionTypes {
  SET_CURRENT_REPO = 'SET_CURRENT_REPO',
}

export type CurrentRepoState = {
  currentRepo: IRepo | null;
};

export type CurrentRepoActions = ReturnType<typeof setCurrentRepoAction>;
