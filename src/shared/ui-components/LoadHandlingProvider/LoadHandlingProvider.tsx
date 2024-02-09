import { PropsWithChildren } from 'react';
import { CustomError } from '@/shared/types/types';
import { ShowMessage } from '..';
import warningIcon from '@/shared/assets/icons/warn-icon.svg?react';
import loadIcon from '@/shared/assets/icons/load-icon.svg?react';

export type LoadHandlingProviderProps = {
  isLoading: boolean;
  loadingMessage?: string;
  error?: Error | CustomError | null;
};

export const LoadHandlingProvider: React.FC<
  PropsWithChildren<LoadHandlingProviderProps>
> = ({ isLoading, loadingMessage = 'Loading...', error, children }) => {
  if (error)
    return <ShowMessage iconSvg={warningIcon} message={error.message} />;
  if (isLoading)
    return <ShowMessage iconSvg={loadIcon} message={loadingMessage} />;

  return children;
};
