import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true,
      error
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="p-4 border rounded bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-300">
          <h3 className="text-lg font-semibold mb-2">Something went wrong</h3>
          <p className="mb-2">There was an error loading this component:</p>
          <pre className="text-sm bg-red-100 dark:bg-red-900/40 p-2 rounded overflow-x-auto">
            {this.state.error?.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;