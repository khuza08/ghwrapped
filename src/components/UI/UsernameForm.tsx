"use client";

import React from "react";
import { ERROR_MESSAGES } from "@/lib/constants";
import { isValidUsername } from "@/lib/utils";

interface UsernameFormProps {
  username: string;
  error: string;
  setUsername: (username: string) => void;
  onSubmit: (username: string) => void;
  setError: (error: string) => void;
}

const UsernameForm: React.FC<UsernameFormProps> = ({
  username,
  error,
  setUsername,
  onSubmit,
  setError,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);

    // Clear error when user starts typing
    if (error && value.trim()) {
      setError("");
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
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

    onSubmit(username);
  };

  return (
    <main className="bg-white/5 border border-white/20 rounded-2xl p-4 sm:p-6 grow">
      <form
        onSubmit={handleFormSubmit}
        className="max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
      >
        <div className="mb-4 sm:mb-6">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-white mb-1"
          >
            GitHub Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleInputChange}
            placeholder="e.g., octocat"
            className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-white/25 rounded-lg text-sm sm:text-base focus:outline-none  text-white"
            autoComplete="off"
          />
        </div>

        {error && (
          <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-lg text-xs sm:text-sm shadow-[0_0_15px_3px_rgba(239,68,68,0.4)]">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 sm:px-6 sm:py-3 bg-white/10 text-white font-semibold rounded-lg
           hover:bg-white/15 focus:outline-none transition text-sm sm:text-base"
        >
          Generate My Wrapped
        </button>

        <p className="mt-3 sm:mt-4 text-center text-xs sm:text-sm text-white/80">
          *your public GitHub data is used to generate these insights. No login
          required
        </p>
      </form>
    </main>
  );
};

export default UsernameForm;
