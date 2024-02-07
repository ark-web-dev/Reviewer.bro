import { LoadHandlingProvider } from '@/shared/ui-components';
import { memo } from 'react';
import { useContributorsMetaData } from './hooks/useContributorsMetaData';
import { RandomReviewer } from '../RandomReviewer/RandomReviewer';
import { BlackListControls } from '../BlackListControls/BlackListControls';

export const ContributorsControls: React.FC = memo(() => {
  const contributors = useContributorsMetaData();

  if (!contributors.items) return;

  return (
    <LoadHandlingProvider
      isLoading={contributors.isLoading}
      loadingMessage="Loading Contributors..."
      error={contributors.error}>
      <BlackListControls
        contributors={contributors.items}
        setContributors={contributors.set}
      />

      <RandomReviewer contributors={contributors.items} />
    </LoadHandlingProvider>
  );
});
