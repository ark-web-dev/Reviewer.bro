import { createContext } from 'react';
import { IRepo } from '../types/types';

type CurrentRepoContextInitial = [
  IRepo | null,
  React.Dispatch<React.SetStateAction<IRepo | null>>
];

export const CurrentRepoContext = createContext<CurrentRepoContextInitial>([
  null,
  () => {},
]);
