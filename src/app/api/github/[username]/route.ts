import { NextRequest } from 'next/server';
import { fetchGitHubUser, fetchGitHubRepos, fetchRepoCommits, fetchRepoLanguages, fetchGitHubContributionData } from '@/lib/github';
import { GitHubWrappedData } from '@/lib/types';
import { getLastYearRange, calculateStreaks, getMostActiveHour, getDeveloperScheduleType, getActivityType } from '@/utils/date';
import { ERROR_MESSAGES, COMMIT_LOOKBACK_DAYS } from '@/lib/constants';
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

    // Fetch user data
    let user;
    try {
      user = await fetchGitHubUser(username, token);
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

    // Calculate date range (last year)
    const { start: startDate } = getLastYearRange();
    const sinceDate = startDate.toISOString();

    // Fetch user repositories
    let repos;
    try {
      repos = await fetchGitHubRepos(username, token);
    } catch (error: any) {
      throw new AppError(ERROR_MESSAGES.DATA_FETCH_ERROR, 500);
    }

    // Fetch contribution data using GraphQL API to get the same count as shown on GitHub profile
    let githubContributionData = null;
    try {
      githubContributionData = await fetchGitHubContributionData(username, token);
    } catch (error) {
      console.warn('Could not fetch contribution data from GraphQL API:', error);
    }

    // Prepare data containers
    const commitsByDate: Record<string, number> = {};
    const languageCount: Record<string, number> = {};
    const languageToRepos: Record<string, Array<{repo: any, bytes: number}>> = {}; // Using any to avoid complex typing issues
    // Use the total contributions from GraphQL API if available, otherwise fall back to commit count
    let totalCommits = githubContributionData?.totalCommitContributions || 0;
    const commitDates: string[] = [];
    const commitsByHour: Record<number, number> = {};

    // Use contribution calendar data from GraphQL API if available
    if (githubContributionData && githubContributionData.contributionCalendar) {
      // Map the contribution calendar data to our format
      for (const week of githubContributionData.contributionCalendar.weeks) {
        for (const day of week.contributionDays) {
          const date = day.date;
          const count = day.contributionCount;
          commitsByDate[date] = count;

          // Add to commitDates for streak calculation but just for days with contributions
          for (let i = 0; i < count; i++) {
            commitDates.push(date + 'T12:00:00Z'); // Using noon as default time
          }
        }
      }
    }

    // Limit the number of repos to analyze for performance
    const reposToAnalyze = repos.slice(0, 20); // Top 20 most recently updated repos

    // Process each repository to get commits (for additional data beyond contribution calendar)
    for (const repo of reposToAnalyze) {
      try {
        const repoCommits = await fetchRepoCommits(user.login, repo.name, token, sinceDate);

        // Process commits for this repo
        for (const commit of repoCommits) {
          // Only count commits made by the user
          if (commit.author && commit.author.login === username) {
            const commitDate = new Date(commit.commit.author.date).toISOString().split('T')[0];

            // Update commits by hour (for personality analysis)
            const hour = new Date(commit.commit.author.date).getUTCHours();
            commitsByHour[hour] = (commitsByHour[hour] || 0) + 1;

            // Keep track of actual commit dates for other calculations
            commitDates.push(commit.commit.author.date);
          }
        }

        // Fetch language data for this repository
        if (repo.language) {
          try {
            const repoLanguages = await fetchRepoLanguages(user.login, repo.name, token);
            for (const [lang, bytes] of Object.entries(repoLanguages)) {
              const byteCount = bytes as number;

              // Add to overall language count
              languageCount[lang] = (languageCount[lang] || 0) + byteCount;

              // Add to language to repos mapping
              if (!languageToRepos[lang]) {
                languageToRepos[lang] = [];
              }
              languageToRepos[lang].push({
                repo: { ...repo }, // Clone to avoid reference issues
                bytes: byteCount
              });
            }
          } catch (error) {
            // If we can't get specific repo language data, fall back to the repo's primary language
            if (repo.language) {
              languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;

              // Add to language to repos mapping with fallback
              if (!languageToRepos[repo.language]) {
                languageToRepos[repo.language] = [];
              }
              languageToRepos[repo.language].push({
                repo: { ...repo },
                bytes: 1 // Fallback value
              });
            }
          }
        }
      } catch (error) {
        // If we can't fetch commits for a specific repo, continue with others
        console.warn(`Could not fetch commits for repo ${repo.name}:`, error);
      }
    }

    // Calculate total commits from the calendar if we used it
    if (githubContributionData && githubContributionData.contributionCalendar) {
      totalCommits = githubContributionData.contributionCalendar.totalContributions;
    }

    // Calculate most active hour
    let mostActiveHour = null;
    let mostActiveHourCount = 0;
    for (const [hour, count] of Object.entries(commitsByHour)) {
      if (count > mostActiveHourCount) {
        mostActiveHourCount = count;
        mostActiveHour = parseInt(hour, 10);
      }
    }

    // Calculate streaks
    const streak = calculateStreaks(commitsByDate);

    // Calculate most active day
    let mostActiveDay = null;
    let mostActiveDayCount = 0;
    for (const [date, count] of Object.entries(commitsByDate)) {
      if (count > mostActiveDayCount) {
        mostActiveDayCount = count;
        mostActiveDay = date;
      }
    }

    // Calculate language breakdown
    const totalLanguageBytes = Object.values(languageCount).reduce((sum, count) => sum + count, 0);
    const languageBreakdown = Object.entries(languageCount)
      .map(([language, bytes]) => ({
        language,
        bytes,
        percentage: totalLanguageBytes > 0 ? parseFloat(((bytes / totalLanguageBytes) * 100).toFixed(2)) : 0
      }))
      .sort((a, b) => b.bytes - a.bytes);

    // Get top repositories by different metrics
    const sortedRepos = [...repos].sort((a, b) => {
      // If both have the same stars, sort by forks
      if (a.stargazers_count === b.stargazers_count) {
        return b.forks_count - a.forks_count;
      }
      return b.stargazers_count - a.stargazers_count;
    });

    const topByStars = sortedRepos.slice(0, 5);
    const topByForks = [...repos].sort((a, b) => b.forks_count - a.forks_count).slice(0, 5);

    // Get years on GitHub
    const yearsOnGitHub = new Date().getFullYear() - new Date(user.created_at).getFullYear();

    // Create the wrapped data object
    const wrappedData: GitHubWrappedData = {
      user,
      summary: {
        totalCommits,
        totalRepos: repos.length,
        totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
        totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
        totalIssues: repos.reduce((sum, repo) => sum + (repo.open_issues_count || 0), 0),
        yearsOnGitHub,
        joinDate: user.created_at,
      },
      commits: {
        commitsByDate,
        mostActiveDay,
        mostActiveDayCount,
        mostActiveHour,
        mostActiveHourCount,
        longestStreak: streak,
        firstCommitDate: commitDates.length > 0 ? new Date(Math.min(...commitDates.map(d => new Date(d).getTime()))).toISOString() : null,
        lastCommitDate: commitDates.length > 0 ? new Date(Math.max(...commitDates.map(d => new Date(d).getTime()))).toISOString() : null,
      },
      repositories: {
        topByCommits: [], // We'll calculate this if needed, but it requires more API calls
        topByStars,
        topByForks,
        languages: languageCount,
        languageBreakdown,
        languageToRepos,
      },
      personality: {
        title: 'Developer',
        description: 'A passionate GitHub user',
        badges: [],
        codingSchedule: getDeveloperScheduleType(mostActiveHour),
        activityType: getActivityType(commitsByDate),
      },
    };

    // Enhance personality based on data
    wrappedData.personality = {
      ...wrappedData.personality,
      ...enhancePersonality(wrappedData)
    };

    return Response.json(wrappedData);
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

// Helper function to enhance personality based on data
function enhancePersonality(wrappedData: GitHubWrappedData) {
  const { summary, commits, repositories, personality } = wrappedData;
  const badges = [];

  // Determine title and description based on activity
  let title = 'Developer';
  let description = 'A passionate GitHub user';

  if (summary.totalCommits > 1000) {
    title = 'Code Legend';
    description = 'Commits flow like rivers from your fingertips';
    badges.push('Code Crusader');
  } else if (summary.totalCommits > 500) {
    title = 'Code Warrior';
    description = 'Battles bugs with keyboard and wit';
    badges.push('Commit Champion');
  } else if (summary.totalCommits > 100) {
    title = 'Code Artisan';
    description = 'Crafts elegant solutions with code';
    badges.push('Quality Coder');
  } else {
    title = 'Code Apprentice';
    description = 'Learning the ways of the code';
    badges.push('Rising Star');
  }

  // Add badges based on other metrics
  if (summary.totalStars > 100) {
    badges.push('Star Gazer');
  }
  if (summary.totalRepos > 20) {
    badges.push('Project Pioneer');
  }
  if (commits.longestStreak && commits.longestStreak.length > 7) {
    badges.push('Streak Master');
  }

  // Add language-based badges
  if (repositories.languageBreakdown.length > 0) {
    const topLanguage = repositories.languageBreakdown[0];
    if (topLanguage) {
      badges.push(`${topLanguage.language} Expert`);
    }
  }

  return {
    title,
    description,
    badges: [...new Set(badges)], // Remove duplicates
    codingSchedule: personality.codingSchedule,
    activityType: personality.activityType,
  };
}