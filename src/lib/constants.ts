// GitHub API endpoints
export const GITHUB_API_BASE_URL = 'https://api.github.com';

// Rate limiting
export const GITHUB_RATE_LIMIT_DELAY = 100; // ms between requests to respect rate limits
export const GITHUB_MAX_REQUESTS_PER_HOUR = 5000;

// Data processing limits
export const MAX_REPOS_TO_ANALYZE = 20; // Max number of repos to analyze commits for
export const MAX_COMMITS_TO_FETCH = 100; // Max commits to fetch per repo
export const COMMIT_LOOKBACK_DAYS = 365; // Look back 1 year for commits

// Personality types
export const PERSONALITY_TYPES = {
  morning: {
    title: 'Early Bird',
    description: 'You code when the world is quiet and fresh ideas flow',
    emoji: '🌅'
  },
  afternoon: {
    title: 'Afternoon Ace',
    description: 'You strike the perfect balance between meetings and coding',
    emoji: '☀️'
  },
  evening: {
    title: 'Evening Expert',
    description: 'You come alive as the day winds down and code begins',
    emoji: '🌆'
  },
  night: {
    title: 'Night Owl',
    description: 'While others sleep, you create magic in the moonlight',
    emoji: '🌙'
  },
  anytime: {
    title: 'Anytime Coder',
    description: 'You code whenever inspiration strikes, rules don\'t apply to you',
    emoji: '⚡'
  }
};

export const ACTIVITY_TYPES = {
  consistent: {
    title: 'Consistent Coder',
    description: 'You maintain a steady rhythm of coding throughout the year',
    emoji: '🎵'
  },
  'weekend-warrior': {
    title: 'Weekend Warrior',
    description: 'You save your coding energy for when you have the most time',
    emoji: '🎉'
  },
  'burst-coder': {
    title: 'Burst Coder',
    description: 'You work in intense focused sprints followed by rest',
    emoji: '💥'
  },
  'steady-pace': {
    title: 'Steady Pacer',
    description: 'You maintain a consistent but moderate coding pace',
    emoji: '🚶'
  }
};

// Default user data in case of API errors
export const DEFAULT_USER_DATA = {
  login: 'octocat',
  id: 583231,
  node_id: 'MDQ6VXNlcjU4MzIzMQ==',
  avatar_url: 'https://avatars.githubusercontent.com/u/583231?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/octocat',
  html_url: 'https://github.com/octocat',
  followers_url: 'https://api.github.com/users/octocat/followers',
  following_url: 'https://api.github.com/users/octocat/following{/other_user}',
  gists_url: 'https://api.github.com/users/octocat/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/octocat/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/octocat/subscriptions',
  organizations_url: 'https://api.github.com/users/octocat/orgs',
  repos_url: 'https://api.github.com/users/octocat/repos',
  events_url: 'https://api.github.com/users/octocat/events{/privacy}',
  received_events_url: 'https://api.github.com/users/octocat/received_events',
  type: 'User',
  site_admin: false,
  name: 'The Octocat',
  company: '@github',
  blog: 'https://github.blog',
  location: 'San Francisco, CA',
  email: null,
  hireable: null,
  bio: 'This profile has no bio',
  twitter_username: null,
  public_repos: 8,
  public_gists: 8,
  followers: 5000,
  following: 2,
  created_at: '2011-01-25T18:44:36Z',
  updated_at: '2023-06-19T17:05:16Z',
};

// Error messages
export const ERROR_MESSAGES = {
  USERNAME_REQUIRED: 'Username is required',
  USERNAME_INVALID: 'Please enter a valid GitHub username',
  USER_NOT_FOUND: 'User not found on GitHub',
  RATE_LIMIT_EXCEEDED: 'API rate limit exceeded. Please try again later',
  NETWORK_ERROR: 'Network error. Please check your connection',
  DATA_FETCH_ERROR: 'Error fetching GitHub data. Please try again',
  PROCESSING_ERROR: 'Error processing GitHub data. Please try again'
};