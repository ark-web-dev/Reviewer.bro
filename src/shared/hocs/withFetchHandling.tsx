import { FC } from 'react';
import { CustomError } from '../types/types';
import { ShowMessage } from '../ui-components';
import warningIcon from '@/shared/assets/icons/warn-icon.svg?react';
import loadIcon from '@/shared/assets/icons/load-icon.svg?react';

type WrapperProps = {
  isLoading: boolean;
  loadingMessage?: string;
  error: Error | CustomError | null;
};

export const withFetchHandling = <T,>(
  WrappedComponent: React.ComponentType<T>
) => {
  const Wrapper: FC<T & WrapperProps> = (props) => {
    const { isLoading, loadingMessage = 'Loading...', error } = props;

    if (error)
      return <ShowMessage iconSvg={warningIcon} message={error.message} />;
    if (isLoading)
      return <ShowMessage iconSvg={loadIcon} message={loadingMessage} />;

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};
