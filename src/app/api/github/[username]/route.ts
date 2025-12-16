import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

interface GitHubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface GitHubRepo {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  };
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
}

// Helper function to fetch GitHub data with proper error handling
async function fetchGitHubData(url: string) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'github-wrapped-app',
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('User not found');
      } else if (response.status === 403) {
        throw new Error('API rate limit exceeded');
      } else {
        throw new Error(`GitHub API error: ${response.status}`);
      }
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const { username } = params;

    // Validate username parameter
    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 }
      );
    }

    // Fetch user profile data
    const user: GitHubUser = await fetchGitHubData(
      `https://api.github.com/users/${username}`
    );

    // Fetch user repositories
    const repos: GitHubRepo[] = await fetchGitHubData(
      `https://api.github.com/users/${username}/repos?sort=updated&direction=desc&per_page=100`
    );

    // Calculate stats
    const stats = {
      totalRepos: user.public_repos,
      totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
      totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
      totalIssues: repos.reduce((sum, repo) => sum + (repo.open_issues_count || 0), 0),
      mostStarredRepo: repos.length > 0 
        ? repos.reduce((prev, current) => 
            (prev.stargazers_count > current.stargazers_count) ? prev : current
          ) 
        : null,
      mostForkedRepo: repos.length > 0 
        ? repos.reduce((prev, current) => 
            (prev.forks_count > current.forks_count) ? prev : current
          ) 
        : null,
      primaryLanguage: repos.length > 0 
        ? repos
            .filter(repo => repo.language)
            .reduce((langCount, repo) => {
              if (repo.language) {
                langCount[repo.language] = (langCount[repo.language] || 0) + 1;
              }
              return langCount;
            }, {} as Record<string, number>)
        : {},
      totalCommits: 0, // Will be calculated differently as commits require more API calls
    };

    // Return user data with stats
    return NextResponse.json({
      user,
      repos,
      stats,
    });
  } catch (error: any) {
    console.error('Error in GitHub API route:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch GitHub data',
        ...(error.status && { status: error.status })
      },
      { 
        status: error.status || 500 
      }
    );
  }
}