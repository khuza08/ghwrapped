import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  onRetry, 
  showRetry = false 
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto text-center p-6">
      <div className="text-red-500 text-5xl mb-4">⚠️</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h3>
      <p className="text-gray-600 mb-4">{message}</p>
      {showRetry && onRetry && (
        <button 
          onClick={onRetry}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;