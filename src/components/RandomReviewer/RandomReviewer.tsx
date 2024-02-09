import React from 'react';
import styles from './RandomReviewer.module.css';
import { getRandomNumber } from '@/shared/lib';
import { LoadHandlingProvider } from '@/shared/ui-components';
import { UserCard } from '../UserCard/UserCard';
import { useReviewerMetaData } from './hooks/useReviewerMetaData';
import { IUser } from '@/shared/types/types';

export interface RandomReviewerProps {
  contributors: IUser[];
}

export const RandomReviewer: React.FC<RandomReviewerProps> = ({
  contributors,
}) => {
  const reviewer = useReviewerMetaData();
  const contributorsLength = contributors.length;

  return (
    <>
      <button
        className={styles.randButton}
        disabled={!contributorsLength || reviewer.isLoading}
        type="button"
        onClick={() =>
          reviewer.fetching(
            contributors[getRandomNumber(0, contributorsLength)]?.login
          )
        }>
        Show Random Reviewer
      </button>

      <LoadHandlingProvider
        isLoading={reviewer.isLoading}
        loadingMessage="Loading Random Reviewer..."
        error={reviewer.error}>
        {reviewer.item && contributorsLength > 0 && (
          <UserCard user={reviewer.item} size="large" />
        )}
      </LoadHandlingProvider>
    </>
  );
};
