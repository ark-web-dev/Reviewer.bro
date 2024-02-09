import { ShowMessage } from '@/shared/ui-components';
import React, { ErrorInfo, ReactNode } from 'react';
import warningIcon from '@/shared/assets/icons/warn-icon.svg?react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render will show the fallback UI.
    console.error(error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <ShowMessage
          message="Something went wrong. Try to reload your page."
          iconSvg={warningIcon}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
