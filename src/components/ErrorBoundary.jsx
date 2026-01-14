import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught in error boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="glass-card rounded-xl p-6 text-center my-6 animate-fade-in">
          <div className="mb-3 text-5xl">⚠️</div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Something went wrong</h2>
          <p className="text-gray-500 text-sm mb-5">
            Unable to load comparison data. Please try again.
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="btn-gradient px-6 py-2"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
