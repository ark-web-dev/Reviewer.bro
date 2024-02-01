import { FC, PropsWithChildren } from 'react';
import styles from './LoadSection.module.css';
import { CustomError } from '@/shared/types/types';
import { ShowMessage } from '..';
import warningIcon from '@/shared/assets/icons/warn-icon.svg?react';
import loadIcon from '@/shared/assets/icons/load-icon.svg?react';

export type LoadSectionProps = {
  isLoading: boolean;
  loadingMessage?: string;
  error?: Error | CustomError | null;
};

export const LoadSection: FC<PropsWithChildren<LoadSectionProps>> = ({
  isLoading,
  loadingMessage = 'Loading...',
  error,
  children,
}) => {
  if (error)
    return <ShowMessage iconSvg={warningIcon} message={error.message} />;
  if (isLoading)
    return <ShowMessage iconSvg={loadIcon} message={loadingMessage} />;

  return <div className={styles.loadSection}>{children}</div>;
};
