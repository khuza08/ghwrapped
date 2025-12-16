import React from 'react';
import { AppError } from '@/lib/errors';

interface ErrorDisplayProps {
  error: AppError | null;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, onRetry }) => {
  if (!error) {
    return null;
  }

  // Customize error messages based on error type
  let displayMessage = error.message;
  let displayTitle = 'Error Loading Data';
  let displayIcon = '⚠️';

  if (error.name === 'UserNotFoundError') {
    displayMessage = `We couldn't find a GitHub user with that username. Please check the spelling and try again.`;
    displayTitle = 'User Not Found';
    displayIcon = '🔍';
  } else if (error.name === 'RateLimitError') {
    displayMessage = `We've reached the GitHub API rate limit. Please try again later.`;
    displayTitle = 'Rate Limit Exceeded';
    displayIcon = '⏱️';
  } else if (error.name === 'GitHubApiError') {
    displayTitle = 'GitHub API Error';
    displayIcon = '📡';
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[300px] p-6 text-center">
      <div className="text-red-500 text-5xl mb-4">{displayIcon}</div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{displayTitle}</h3>
      <p className="text-gray-600 mb-4">{displayMessage}</p>
      {onRetry && (
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

export default ErrorDisplay;