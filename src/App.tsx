import { Provider } from 'react-redux';
import { MainContent } from './components/MainContent/MainContent';
import ErrorBoundary from './shared/providers/ErrorBoundary/ErrorBoundary';
import { store } from './store/store';

const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <MainContent />
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
