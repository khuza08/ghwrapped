'use client';

import React, { useState } from 'react';
import { isValidUsername, normalizeUsername } from '@/lib/utils';
import GitHubWrappedSlides from '@/components/GitHubWrapped/SlideContainer';
import { ERROR_MESSAGES } from '@/lib/constants';

const GitHubWrappedPage = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showWrapped, setShowWrapped] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate username
    if (!username.trim()) {
      setError(ERROR_MESSAGES.USERNAME_REQUIRED);
      return;
    }

    if (!isValidUsername(username)) {
      setError(ERROR_MESSAGES.USERNAME_INVALID);
      return;
    }

    setError('');
    setShowWrapped(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 py-6 px-4 lg:px-8 xl:px-16">
      <div className="max-w-full mx-auto">
        <header className="text-center mb-6 md:mb-8 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-2 sm:mb-3">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              GitHub Wrapped
            </span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl lg:max-w-3xl mx-auto px-4">
            Discover your GitHub year in review! Enter your username to see your coding stats,
            top languages, contributions, and more.
          </p>
        </header>

        {!showWrapped ? (
          <main className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
            <form onSubmit={handleSubmit} className="max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
              <div className="mb-4 sm:mb-6">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g., octocat"
                  className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-sm sm:text-base"
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-xs sm:text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition text-sm sm:text-base"
              >
                Generate My Wrapped
              </button>

              <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-gray-500">
                Your public GitHub data is used to generate these insights. No login required.
              </p>
            </form>
          </main>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="lg:w-1/4 xl:w-1/5 flex-shrink-0">
              <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 sticky top-6">
                <div className="flex flex-col justify-between items-center mb-4">
                  <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 text-center">
                    @{normalizeUsername(username)}'s
                  </h2>
                  <h3 className="text-sm sm:text-base font-semibold text-blue-600">
                    GitHub Wrapped
                  </h3>
                  <button
                    onClick={() => setShowWrapped(false)}
                    className="mt-4 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-600 hover:text-gray-800 bg-gray-100 rounded-lg"
                  >
                    ← Change User
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:w-3/4 xl:w-4/5">
              <main className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
                <GitHubWrappedSlides username={normalizeUsername(username)} />
              </main>
            </div>
          </div>
        )}

        <footer className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm">
          <p>GitHub Wrapped • Made with ❤️ and code</p>
          <p className="mt-1 sm:mt-2">This project uses only public GitHub data. No login required.</p>
        </footer>
      </div>
    </div>
  );
};

export default GitHubWrappedPage;