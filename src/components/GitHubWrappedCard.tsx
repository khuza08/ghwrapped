"use client";

import React, { useRef } from "react";
import { downloadPng } from "@/utils/imageConversion";

interface GitHubWrappedData {
  user: {
    login: string;
    avatar_url: string;
    name: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    created_at: string;
  };
  stats: {
    totalRepos: number;
    totalStars: number;
    totalForks: number;
    totalIssues: number;
    mostStarredRepo: {
      name: string;
      stargazers_count: number;
    } | null;
    mostForkedRepo: {
      name: string;
      forks_count: number;
    } | null;
    primaryLanguage: Record<string, number>;
    totalCommits: number;
  };
  languages: {
    languages: Array<{
      language: string;
      percentage: number;
    }>;
  };
  contributions: {
    totalCommits: number;
    mostActiveDay: string;
    mostCommitsInADay: number;
    topRepo: string;
  };
}

interface GitHubWrappedCardProps {
  data: GitHubWrappedData | null;
  isLoading?: boolean;
  username?: string;
}

const GitHubWrappedCard: React.FC<GitHubWrappedCardProps> = ({
  data,
  isLoading = false,
  username = "",
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (cardRef.current) {
      try {
        await downloadPng(
          cardRef.current,
          `github-wrapped-${username || "user"}`,
        );
      } catch (error) {
        console.error("Error downloading image:", error);
        alert("Failed to download image. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full h-[500px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your GitHub Wrapped...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            GitHub Wrapped
          </h2>
          <p className="text-gray-600">
            {username
              ? `Could not load data for user: ${username}`
              : "Enter a GitHub username to get started"}
          </p>
        </div>
      </div>
    );
  }

  const { user, stats, languages, contributions } = data;

  // Get top 5 languages
  const topLanguages = languages.languages.slice(0, 5);

  // Format creation date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Determine user's GitHub journey years
  const yearsOnGitHub =
    new Date().getFullYear() - new Date(user.created_at).getFullYear();

  return (
    <div className="flex flex-col items-center w-full">
      <div
        ref={cardRef}
        className="bg-linear-to-br from-gray-900 to-blue-900 rounded-2xl shadow-2xl p-8 max-w-2xl w-full text-white overflow-hidden relative"
        style={{ minHeight: "600px" }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-70"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center mb-8">
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-20 h-20 rounded-full border-4 border-white shadow-lg mr-6"
            />
            <div>
              <h1 className="text-3xl font-bold">{user.name || user.login}</h1>
              <p className="text-xl text-blue-300">@{user.login}</p>
            </div>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {yearsOnGitHub}y
              </div>
              <div className="text-sm text-gray-300">On GitHub</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">
                {stats.totalRepos}
              </div>
              <div className="text-sm text-gray-300">Repos</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {contributions.totalCommits}
              </div>
              <div className="text-sm text-gray-300">Commits</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {stats.totalStars}
              </div>
              <div className="text-sm text-gray-300">Stars</div>
            </div>
          </div>

          {/* Top Languages */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">📊</span> Top Languages
            </h2>
            <div className="space-y-2">
              {topLanguages.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="font-medium">{lang.language}</span>
                  </div>
                  <span className="text-blue-300">{lang.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contributions */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="mr-2">🔥</span> Contributions
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
                <div className="text-lg font-bold text-red-400">
                  {contributions.mostCommitsInADay}
                </div>
                <div className="text-sm text-gray-300">
                  Max commits in a day
                </div>
                {contributions.mostActiveDay && (
                  <div className="text-xs text-gray-400 mt-1">
                    on {contributions.mostActiveDay}
                  </div>
                )}
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4">
                <div className="text-lg font-bold text-teal-400">
                  {contributions.topRepo || "N/A"}
                </div>
                <div className="text-sm text-gray-300">Most active repo</div>
              </div>
            </div>
          </div>

          {/* Bio */}
          {user.bio && (
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-2 flex items-center">
                <span className="mr-2">✍️</span> Bio
              </h2>
              <p className="text-gray-300 italic">"{user.bio}"</p>
            </div>
          )}

          {/* Footer */}
          <div className="pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
            GitHub Wrapped 2024 • Made with ❤️ and code
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="mt-6 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:from-blue-600 hover:to-purple-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Download as Image
      </button>
    </div>
  );
};

export default GitHubWrappedCard;
