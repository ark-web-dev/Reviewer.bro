import { useState } from 'react';
import { MainContent } from './components/MainContent/MainContent';
import { CurrentRepoContext } from './shared/context/CurrentRepoContext';
import { IRepo } from './shared/types/types';
import ErrorBoundary from './shared/providers/ErrorBoundary/ErrorBoundary';

const App = () => {
  const currentRepoState = useState<IRepo | null>(null);

  return (
    <ErrorBoundary>
      <CurrentRepoContext.Provider value={currentRepoState}>
        <MainContent />
      </CurrentRepoContext.Provider>
    </ErrorBoundary>
  );
};

export default App;
