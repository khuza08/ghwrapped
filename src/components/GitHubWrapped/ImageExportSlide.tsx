import React from 'react';
import { GitHubWrappedData } from '@/lib/types';
import { formatReadableDate } from '@/utils/date';
import { formatNumber } from '@/lib/utils';
import AnimatedCounter from '@/components/UI/AnimatedCounter';
import { PERSONALITY_TYPES, ACTIVITY_TYPES } from '@/lib/constants';
import languageColors from '@/lib/languageColors.json';

// Function to get language color based on GitHub's language colors from linguist
const getLanguageColor = (language: string): string => {
  const color = languageColors[language];
  // Validate that the color is in a supported format
  if (color && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
    return color;
  }
  return '#888888'; // Default gray if language not found or format is invalid
};

interface ImageExportSlideProps {
  data: GitHubWrappedData;
}

const ImageExportSlide: React.FC<ImageExportSlideProps> = ({ data }) => {
  const { summary, user, commits, repositories, personality } = data;
  const joinDate = formatReadableDate(user.created_at);

  // Get top 5 languages
  const topLanguages = repositories.languageBreakdown.slice(0, 5);

  // Get top repos by stars
  const topReposByStars = repositories.topByStars.slice(0, 3); // Reduced to top 3 for space

  // Get top repos by forks
  const topReposByForks = repositories.topByForks.slice(0, 3); // Reduced to top 3 for space

  // Get the personality details
  const scheduleDetails = PERSONALITY_TYPES[personality.codingSchedule];
  const activityDetails = ACTIVITY_TYPES[personality.activityType];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Wrapped Content - with data-export-wrapped attribute for export function */}
      <div
        data-export-wrapped
        className="text-center bg-gray-900 text-white p-8 rounded-2xl shadow-2xl border border-gray-800">
        <div className="mb-6">
          <div className="flex items-center justify-center mb-2">
            <div className="text-2xl mr-2">📊</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
              GitHub Wrapped 2024
            </h1>
            <div className="text-2xl ml-2">🚀</div>
          </div>
          
          <div className="flex items-center justify-center mb-4">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full border-2 border-gray-600 mr-4"
            />
            <div className="text-left">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">
                {user.name || user.login}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-300">
                @{user.login}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-lg font-bold text-white">
              <AnimatedCounter value={formatNumber(summary.totalCommits || 0)} />
            </div>
            <div className="text-xs text-gray-400">Commits</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-lg font-bold text-white">
              <AnimatedCounter value={formatNumber(summary.totalRepos || 0)} />
            </div>
            <div className="text-xs text-gray-400">Repos</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-lg font-bold text-white">
              <AnimatedCounter value={formatNumber(summary.totalStars || 0)} />
            </div>
            <div className="text-xs text-gray-400">Stars</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-lg font-bold text-white">
              {(summary.yearsOnGitHub || 0)}y
            </div>
            <div className="text-xs text-gray-400">On GitHub</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm md:text-base font-bold text-white mb-2">Active Days</h3>
            <div className="flex items-baseline justify-center">
              <div className="text-xl md:text-2xl font-bold text-white">
                <AnimatedCounter value={formatNumber(commits.activeDays || 0)} />
              </div>
              <span className="text-gray-400 ml-2">days</span>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-sm md:text-base font-bold text-white mb-2">Most Commits in a Day</h3>
            <div className="flex items-baseline justify-center">
              <div className="text-xl md:text-2xl font-bold text-white">
                <AnimatedCounter value={formatNumber(commits.mostCommitsInDay || 0)} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-3">
            <h3 className="text-sm md:text-base font-semibold text-white mb-2">
              Your Coding Schedule
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-1">
              <div className="text-base font-bold text-purple-400">
                {commits.mostActiveHour !== null 
                  ? `${commits.mostActiveHour}:00` 
                  : "No data"}
              </div>
              <span className="text-xs text-gray-400">
                is your most productive time
              </span>
              <div className="text-lg">⏰</div>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              You're a {personality.codingSchedule} coder
            </p>
          </div>

          <div className="bg-gray-800 rounded-lg p-3">
            {commits.longestStreak ? (
              <div>
                <h4 className="font-bold text-white text-sm">Longest Streak</h4>
                <p className="text-xs text-gray-400">
                  {commits.longestStreak.length} days in a row! 
                  {commits.longestStreak.start} to {commits.longestStreak.end}
                </p>
              </div>
            ) : (
              <div className="text-xs text-gray-400 italic">
                No streak data available
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3">
            Your Languages in 2024
          </h3>

          <div className="space-y-1 mb-3">
            {topLanguages.length > 0 ? (
              topLanguages.map((lang, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-800 border border-gray-600 rounded text-xs"
                >
                  <div className="flex items-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: getLanguageColor(lang.language) }}
                    ></div>
                    <span className="font-medium text-white">
                      {lang.language}
                    </span>
                  </div>
                  <div className="text-gray-400">{lang.percentage}%</div>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-400">
                No language data available
              </p>
            )}
          </div>

          <div className="text-xs text-gray-400">
            You coded in{" "}
            <span className="font-semibold">
              {repositories.languageBreakdown.length}
            </span>{" "}
            different languages
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-bold text-white mb-3">Your Top Repositories</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-3">
            <div className="bg-gray-800 p-3 rounded-lg">
              <h4 className="font-bold text-xs md:text-sm text-white mb-2">
                By Stars
              </h4>
              <div className="space-y-1">
                {topReposByStars.length > 0 ? (
                  topReposByStars.map((repo) => (
                    <div
                      key={repo.id}
                      className="flex justify-between items-center p-1.5 bg-gray-700 border border-gray-600 rounded text-xs"
                    >
                      <div>
                        <div className="font-medium text-white">{repo.name}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1 text-sm">★</span>
                        <span className="font-semibold text-white">
                          {formatNumber(repo.stargazers_count || 0)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    No repositories with stars
                  </p>
                )}
              </div>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <h4 className="font-bold text-xs md:text-sm text-white mb-2">
                By Forks
              </h4>
              <div className="space-y-1">
                {topReposByForks.length > 0 ? (
                  topReposByForks.map((repo) => (
                    <div
                      key={repo.id}
                      className="flex justify-between items-center p-1.5 bg-gray-700 border border-gray-600 rounded text-xs"
                    >
                      <div>
                        <div className="font-medium text-white">{repo.name}</div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-blue-400 mr-1 text-sm">⎇</span>
                        <span className="font-semibold text-white">
                          {formatNumber(repo.forks_count || 0)}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400">
                    No repositories with forks
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-gray-800 p-2 rounded-lg">
              <div className="text-sm font-bold text-white">
                {formatNumber(summary.totalRepos || 0)}
              </div>
              <div className="text-xs text-gray-400">
                Repos
              </div>
            </div>
            <div className="bg-gray-800 p-2 rounded-lg">
              <div className="text-sm font-bold text-white">
                {formatNumber(summary.totalStars || 0)}
              </div>
              <div className="text-xs text-gray-400">
                Stars
              </div>
            </div>
            <div className="bg-gray-800 p-2 rounded-lg">
              <div className="text-sm font-bold text-white">
                {formatNumber(summary.totalForks || 0)}
              </div>
              <div className="text-xs text-gray-400">
                Forks
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">Your Developer Profile</h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-xl mb-1 text-white">{scheduleDetails.emoji}</div>
              <h4 className="text-sm font-bold text-white">{scheduleDetails.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{scheduleDetails.description}</p>
            </div>

            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-xl mb-1 text-white">{activityDetails.emoji}</div>
              <h4 className="text-sm font-bold text-white">{activityDetails.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{activityDetails.description}</p>
            </div>
          </div>

          {personality.badges.length > 0 && (
            <div className="mb-4">
              <h4 className="text-xs md:text-sm font-semibold text-white mb-2">Your Badges</h4>
              <div className="flex flex-wrap justify-center gap-1">
                {personality.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-gray-700 text-white rounded-full text-xs font-medium"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4">
            <h4 className="text-xs md:text-sm font-semibold text-white mb-1">Your Coding Style</h4>
            <p className="text-xs md:text-sm text-white">
              With <span className="font-bold text-white">{summary.totalCommits || 0}</span> commits this year,
              you're a <span className="font-semibold text-white">{personality.title.toLowerCase()}.</span>
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            Generated on GitHub Wrapped 2024
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageExportSlide;