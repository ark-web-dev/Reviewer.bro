import React from 'react';
import styles from './RandomReviewer.module.css';
import { LoadHandlingProvider } from '@/shared/ui-components';
import { UserCard } from '../UserCard/UserCard';
import { useReviewerMetaData } from './hooks/useReviewerMetaData';
import { IUser } from '@/shared/types/types';
import { appHeights } from '@/shared/const/appHeights';

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
        onClick={reviewer.fetching}>
        Show Random Reviewer
      </button>

      <LoadHandlingProvider
        isLoading={reviewer.isLoading}
        loadingMessage="Loading Random Reviewer..."
        error={reviewer.error}
        loadHeight={appHeights.reviewer}>
        {reviewer.item && contributorsLength > 0 && (
          <UserCard user={reviewer.item} size="large" />
        )}
      </LoadHandlingProvider>
    </>
  );
};
