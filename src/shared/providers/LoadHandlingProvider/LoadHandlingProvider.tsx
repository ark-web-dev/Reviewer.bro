import { PropsWithChildren, memo, useLayoutEffect, useState } from 'react';
import styles from './LoadHandlingProvider.module.css';
import { CustomError } from '@/shared/types/types';
import { ShowMessage } from '../../ui-components';
import warningIcon from '@/shared/assets/icons/warn-icon.svg?react';
import loadIcon from '@/shared/assets/icons/load-icon.svg?react';

export type LoadHandlingProviderProps = {
  isLoading: boolean;
  loadingMessage?: string;
  error?: Error | CustomError | null;
  loadHeight?: number;
  zIndex?: number;
};

export const LoadHandlingProvider: React.FC<
  PropsWithChildren<LoadHandlingProviderProps>
> = memo(
  ({
    isLoading,
    loadingMessage = 'Loading...',
    error,
    children,
    loadHeight,
    zIndex,
  }) => {
    const [height, setHeight] = useState('0px');

    useLayoutEffect(() => {
      if (isLoading) {
        setHeight('0px');

        const rafId = requestAnimationFrame(() => {
          setHeight(`${loadHeight}px`);
        });

        return () => {
          cancelAnimationFrame(rafId);
        };
      }
    }, [isLoading]);

    if (!children && !isLoading && !error) return;

    return (
      <div
        className={styles.loadWrapper}
        style={{
          height: !children ? height : '',
          overflow: !children ? 'hidden' : 'visible',
          zIndex,
        }}>
        {isLoading && (
          <ShowMessage iconSvg={loadIcon} message={loadingMessage} />
        )}
        {error && <ShowMessage iconSvg={warningIcon} message={error.message} />}

        {children && (
          <div className={children ? styles.fadeIn : ''}>{children}</div>
        )}
      </div>
    );
  }
);
