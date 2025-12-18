import { sleep } from '@/lib/utils';
import { GITHUB_API_BASE_URL, GITHUB_RATE_LIMIT_DELAY, ERROR_MESSAGES } from '@/lib/constants';
import { GitHubUser, GitHubRepo, GitHubCommit } from '@/lib/types';

// Rate limiting variables
let lastApiCallTime = 0;

/**
 * Make a request to GitHub API with proper headers and rate limiting
 */
export const makeGitHubApiRequest = async (
  endpoint: string,
  token: string | undefined,
  options: RequestInit = {}
): Promise<any> => {
  // Implement basic rate limiting
  const now = Date.now();
  const timeSinceLastCall = now - lastApiCallTime;
  
  if (timeSinceLastCall < GITHUB_RATE_LIMIT_DELAY) {
    await sleep(GITHUB_RATE_LIMIT_DELAY - timeSinceLastCall);
  }
  
  lastApiCallTime = Date.now();

  const headers: HeadersInit = {
    'User-Agent': 'GitHub-Wrapped-App',
    'Accept': 'application/vnd.github.v3+json',
    ...options.headers,
  };

  // Add authorization header if token is provided
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${GITHUB_API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
      } else if (response.status === 403) {
        throw new Error(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED);
      } else {
        throw new Error(`${ERROR_MESSAGES.DATA_FETCH_ERROR}: ${response.status} - ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error: any) {
    console.error(`GitHub API error for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * Fetch user data from GitHub
 */
export const fetchGitHubUser = async (username: string, token: string | undefined): Promise<GitHubUser> => {
  return makeGitHubApiRequest(`/users/${username}`, token);
};

/**
 * Fetch user's repositories
 */
export const fetchGitHubRepos = async (username: string, token: string | undefined): Promise<GitHubRepo[]> => {
  // Get first 100 repos (GitHub's max per page)
  return makeGitHubApiRequest(`/users/${username}/repos?sort=updated&direction=desc&per_page=100`, token);
};

/**
 * Fetch commits for a specific repository
 */
export const fetchRepoCommits = async (
  owner: string, 
  repo: string, 
  token: string | undefined,
  since?: string
): Promise<GitHubCommit[]> => {
  let endpoint = `/repos/${owner}/${repo}/commits`;
  if (since) {
    endpoint += `?since=${since}`;
  }
  
  return makeGitHubApiRequest(endpoint, token);
};

/**
 * Fetch language data for a specific repository
 */
export const fetchRepoLanguages = async (owner: string, repo: string, token: string | undefined): Promise<Record<string, number>> => {
  return makeGitHubApiRequest(`/repos/${owner}/${repo}/languages`, token);
};

/**
 * Fetch all user events (for more detailed analysis of activity)
 */
export const fetchUserEvents = async (username: string, token: string | undefined): Promise<any[]> => {
  return makeGitHubApiRequest(`/users/${username}/events`, token);
};

/**
 * Fetch user's contribution data using GitHub GraphQL API
 */
export const fetchGitHubContributionData = async (username: string, token: string | undefined): Promise<any> => {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionYears
          totalCommitContributions
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    username,
  };

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'User-Agent': 'GitHub-Wrapped-App',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL API error: ${response.status} - ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL errors: ${result.errors.map((e: any) => e.message).join(', ')}`);
    }

    return result.data.user.contributionsCollection;
  } catch (error: any) {
    console.error('GitHub GraphQL API error:', error);
    throw error;
  }
};