/**
 * Error display component
 */
import React from 'react';

interface ErrorDisplayProps {
  message?: string;
  error?: Error;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  message = 'An error occurred while fetching data.', 
  error,
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-800 border border-red-200 rounded-lg bg-red-50 max-w-md mx-auto">
      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Data Error</h3>
      <p className="text-center mb-4">{message}</p>
      {error && (
        <div className="text-sm text-red-700 bg-red-100 p-2 rounded mb-4 w-full overflow-auto">
          {error.message}
        </div>
      )}
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay; 