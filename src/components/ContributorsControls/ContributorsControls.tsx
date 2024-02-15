import { LoadHandlingProvider } from '@/shared/ui-components';
import { memo } from 'react';
import { useContributorsMetaData } from './hooks/useContributorsMetaData';
import { RandomReviewer } from '../RandomReviewer/RandomReviewer';
import { BlackListControls } from '../BlackListControls/BlackListControls';
import { appHeights } from '@/shared/const/appHeights';

export const ContributorsControls: React.FC = memo(() => {
  const contributors = useContributorsMetaData();

  return (
    <LoadHandlingProvider
      isLoading={contributors.isLoading}
      loadingMessage="Loading Contributors..."
      error={contributors.error}
      loadHeight={appHeights.contributors}>
      {contributors.items && (
        <>
          <BlackListControls contributors={contributors.items} />
          <RandomReviewer contributors={contributors.items} />
        </>
      )}
    </LoadHandlingProvider>
  );
});
