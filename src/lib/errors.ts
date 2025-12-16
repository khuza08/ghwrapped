// Error service for handling and logging errors throughout the app
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(
    message: string,
    statusCode: number,
    isOperational = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Maintains proper stack trace for where our error was thrown (only available on V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError);
    }

    this.name = this.constructor.name;
  }
}

// GitHub API specific errors
export class GitHubApiError extends AppError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
    this.name = 'GitHubApiError';
  }
}

export class RateLimitError extends GitHubApiError {
  constructor() {
    super('GitHub API rate limit exceeded. Please try again later.', 403);
    this.name = 'RateLimitError';
  }
}

export class UserNotFoundError extends GitHubApiError {
  constructor(username: string) {
    super(`GitHub user "${username}" not found.`, 404);
    this.name = 'UserNotFoundError';
  }
}

// Error handling utilities
export const handleApiError = (error: any): AppError => {
  // Check if it's already an AppError
  if (error instanceof AppError) {
    return error;
  }

  // Handle network errors
  if (error.message.includes('Failed to fetch')) {
    return new AppError('Network error. Please check your connection.', 503);
  }

  // Handle GitHub API specific errors
  if (error.message.includes('404')) {
    return new UserNotFoundError('Unknown');
  }
  
  if (error.message.includes('403')) {
    return new RateLimitError();
  }

  // Handle generic errors
  return new AppError(
    error.message || 'An unexpected error occurred',
    error.statusCode || 500
  );
};

// Log error utility
export const logError = (error: Error, context?: string): void => {
  console.error(`[${context || 'Error'}]:`, {
    name: error.name,
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });
};

// Format error response for API routes
export const formatErrorResponse = (error: AppError) => {
  logError(error, 'API_ERROR');
  
  return {
    error: {
      message: error.message,
      type: error.name,
      timestamp: new Date().toISOString(),
    },
    statusCode: error.statusCode,
  };
};