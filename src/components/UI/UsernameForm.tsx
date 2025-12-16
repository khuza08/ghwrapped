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
    <div className="bg-white/5 border border-white/20 rounded-2xl px-8 w-full max-w-2xl">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 mt-4">
          Discover your GitHub year in review!
        </h1>
        <p className="text-white/80">
          Enter your username to see your coding stats, top languages,
          contributions, and more.
        </p>
      </div>

      {/* Input Section */}
      <form onSubmit={handleFormSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
          <div className="w-full sm:w-auto grow">
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="e.g elza_kentucky"
              className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none text-base border border-white/20"
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-white/10 text-white flex items-center justify-center min-w-14 h-14"
          >
            <span className="hidden sm:inline">Go</span>
            <span className="sm:hidden">→</span>
          </button>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-lg text-sm shadow-[0_0_15px_3px_rgba(239,68,68,0.4)]">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default UsernameForm;
