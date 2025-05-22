/**
 * Loading indicator component
 */
import React from 'react';

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  message = 'Loading…' 
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-lg">{message}</p>
    </div>
  );
};

export default LoadingIndicator; 