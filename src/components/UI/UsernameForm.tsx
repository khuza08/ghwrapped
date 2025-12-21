"use client";
import React, { useState, useEffect } from "react";
import { ERROR_MESSAGES } from "@/lib/constants";
import { isValidUsername } from "@/lib/utils";
import { FiArrowRight } from "react-icons/fi";

interface UsernameFormProps {
  username: string;
  error: string;
  setUsername: (username: string) => void;
  onSubmit: (username: string, data: any) => void; // Accept data parameter
  setError: (error: string) => void;
  onCheckUser: (username: string) => Promise<boolean>;
}

const UsernameForm: React.FC<UsernameFormProps> = ({
  username,
  error,
  setUsername,
  onSubmit,
  setError,
  onCheckUser,
}) => {
  const [checking, setChecking] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (error && value.trim()) {
      setError("");
    }
  };

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    // add smol delay for dom
    setTimeout(() => {
      setShowToast(true);
    }, 32);
    setTimeout(() => {
      setShowToast(false);
      setTimeout(() => {
        setNotification(null);
      }, 800);
    }, 3000);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError(ERROR_MESSAGES.USERNAME_REQUIRED);
      return;
    }
    if (!isValidUsername(username)) {
      setError(ERROR_MESSAGES.USERNAME_INVALID);
      return;
    }
    setChecking(true);

    try {
      const userExists = await onCheckUser(username);

      if (userExists) {
        // fetch the full data since user exists
        const startTime = Date.now();
        const response = await fetch(`/api/github/${username}`);

        if (response.ok) {
          const data = await response.json();
          const duration = (Date.now() - startTime) / 1000; // Convert to seconds

          showNotification(
            `Data loaded in ${duration.toFixed(2)}s! Unwrapping...`,
            "success",
          );
          setTimeout(() => {
            onSubmit(username, data);
          }, 800);
        } else {
          const errorData = await response.json();
          showNotification(errorData.message || "Error fetching data", "error");
          setTimeout(() => {
            setError(errorData.message || "Error fetching data");
          }, 2000);
        }
      } else {
        showNotification("User not found on GitHub", "error");
        setTimeout(() => {
          setError("User not found on GitHub");
        }, 2000);
      }
    } catch (err) {
      showNotification("Error checking user", "error");
      setTimeout(() => {
        setError("Error checking user");
      }, 300);
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/20 rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-2xl relative">
      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-b from-white via-white to-white/50 bg-clip-text text-transparent mb-2 mt-4">
          Discover your GitHub year in review!
        </h1>
        <p className="text-white/80 text-sm sm:text-base">
          Enter your username to see your coding stats, top languages,
          contributions, and more.
        </p>
      </div>

      {/* Input Section */}
      <form onSubmit={handleFormSubmit} className="mb-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 items-center w-full">
          <div className="w-full grow">
            <input
              type="text"
              value={username}
              onChange={handleInputChange}
              placeholder="e.g elza_batagor"
              className="w-full px-4 py-3 rounded-lg bg-white/5 text-white placeholder-white/50 focus:outline-none text-base border border-white/20 h-14"
              autoComplete="off"
              disabled={checking}
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto min-w-14 h-14 px-4 py-3 rounded-lg bg-white/10 text-white flex items-center justify-center disabled:opacity-50 hover:text-white/50 transition-colors duration-300"
            disabled={checking}
          >
            {checking ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>
                <FiArrowRight className="hidden sm:block font-bold text-xl" />
                <span className="sm:hidden font-bold">Unwrap</span>
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="mt-3 p-3 bg-red-900/30 border border-red-700 text-red-300 rounded-lg text-sm shadow-[0_0_15px_3px_rgba(239,68,68,0.4)]">
            {error}
          </div>
        )}
      </form>

      {/* Toast */}
      {notification && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-50 transition-opacity duration-500 ease-in-out ${
            showToast ? "opacity-100" : "opacity-0"
          } ${
            notification.type === "success"
              ? "bg-green-600/10 border border-green-600 text-white shadow-[0_0_15px_3px_rgba(34,197,94,0.4)]"
              : "bg-red-700/10 border border-red-700 text-white shadow-[0_0_15px_3px_rgba(239,68,68,0.4)]"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default UsernameForm;
