import { NextRequest } from 'next/server';
import { fetchGitHubUser } from '@/lib/github';
import { ERROR_MESSAGES } from '@/lib/constants';
import { AppError, handleApiError, formatErrorResponse, RateLimitError, UserNotFoundError } from '@/lib/errors';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ username: string }> }
) {
  try {
    // Extract username from the dynamic route parameter
    const { username } = await context.params;

    // Validate username
    if (!username) {
      return Response.json(
        { error: ERROR_MESSAGES.USERNAME_REQUIRED },
        { status: 400 }
      );
    }

    // Get GitHub token from environment
    const token = process.env.GITHUB_TOKEN;

    // Only verify user exists, don't fetch all data
    try {
      const user = await fetchGitHubUser(username, token);
      
      // If we get here, user exists
      return Response.json({ exists: true, user: { login: user.login, id: user.id } });
    } catch (error: any) {
      // Identify specific error types
      if (error.message.includes('404')) {
        throw new UserNotFoundError(username);
      } else if (error.message.includes('403')) {
        throw new RateLimitError();
      } else {
        throw new AppError(error.message || ERROR_MESSAGES.USER_NOT_FOUND, 404);
      }
    }
  } catch (error: any) {
    // Handle errors with our error service
    const appError = handleApiError(error);
    const errorResponse = formatErrorResponse(appError);

    return Response.json(
      errorResponse.error,
      { status: appError.statusCode }
    );
  }
}