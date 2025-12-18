"use client";

import React, { useState } from "react";
import { normalizeUsername } from "@/lib/utils";
import { ERROR_MESSAGES } from "@/lib/constants";
import GitHubWrappedHeader from "@/components/UI/GitHubWrappedHeader";
import UsernameForm from "@/components/UI/UsernameForm";
import WrappedMainContent from "@/components/UI/WrappedMainContent";
import GitHubWrappedFooter from "@/components/UI/GitHubWrappedFooter";
import { FaGithub } from "react-icons/fa";
import WrappedView from "@/components/UI/WrappedView";

// Cache duration: 1 hour (3600000 ms)
const CACHE_DURATION = 3600000;

const GitHubWrappedPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showWrapped, setShowWrapped] = useState(false);

  const checkUserExists = async (username: string): Promise<boolean> => {
    if (typeof window === 'undefined') return false;

    // First check if we have a cached verification result
    const cacheKey = `github-wrapped-verification-${username.toLowerCase()}`;
    const cached = localStorage.getItem(cacheKey);

    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        // Check if cache is still valid (not expired)
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          if (parsed.exists) {
            // If user was previously verified and exists, check if full data is available
            const dataCacheKey = `github-wrapped-data-${username.toLowerCase()}`;
            const dataCached = localStorage.getItem(dataCacheKey);

            if (dataCached) {
              const dataParsed = JSON.parse(dataCached);
              if (Date.now() - dataParsed.timestamp < CACHE_DURATION) {
                // Data is still fresh, no need to fetch again
                return true;
              }
            }
            // User exists but data may be stale, so we'll fetch fresh data below
          } else {
            // User doesn't exist - return false immediately
            return false;
          }
        }
      } catch (error) {
        console.error('Error parsing cached verification:', error);
      }
    }

    try {
      // Make a single request to the main API endpoint
      const response = await fetch(`/api/github/${username}`);

      if (response.ok) {
        const data = await response.json();

        // Cache the data so WrappedView can use it immediately
        if (typeof window !== 'undefined' && data) {
          const dataCacheKey = `github-wrapped-data-${username.toLowerCase()}`;
          const cacheData = {
            data,
            timestamp: Date.now(),
          };

          try {
            localStorage.setItem(dataCacheKey, JSON.stringify(cacheData));
          } catch (dataCacheError) {
            console.error('Error caching data during verification:', dataCacheError);
          }
        }

        // Cache the verification result
        try {
          const verificationCache = {
            exists: true,
            timestamp: Date.now(),
          };
          localStorage.setItem(cacheKey, JSON.stringify(verificationCache));
        } catch (verificationCacheError) {
          console.error('Error caching verification:', verificationCacheError);
        }

        return true;
      } else {
        // User doesn't exist, cache this result too
        try {
          const verificationCache = {
            exists: false,
            timestamp: Date.now(),
          };
          localStorage.setItem(cacheKey, JSON.stringify(verificationCache));
        } catch (verificationCacheError) {
          console.error('Error caching negative verification:', verificationCacheError);
        }

        // If the response is not ok, it means user doesn't exist or there's an error
        return false;
      }
    } catch (error) {
      console.error("Error checking user:", error);
      return false;
    }
  };

  const handleSubmit = (username: string) => {
    setError("");
    setShowWrapped(true);
  };

  const handleGithubClick = () => {
    window.open(
      "https://github.com/khuza08/ghwrapped",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white py-6 px-4 lg:px-8 xl:px-16">
      <div className="max-w-full mx-auto w-full  flex flex-col flex-grow">
        {showWrapped ? (
          <div className="relative flex-grow">
            <WrappedView
              username={username}
              onBackClick={() => setShowWrapped(false)}
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center grow">
            <div className="bg-white/5 border border-white/20 rounded-2xl shadow-lg p-4 w-full max-w-2xl">
              <UsernameForm
                username={username}
                error={error}
                setUsername={setUsername}
                setError={setError}
                onSubmit={handleSubmit}
                onCheckUser={checkUserExists}
              />
              <div className="mt-4 px-2 flex flex-row justify-between items-center text-white text-sm sm:text-base">
                <div className="font-bold bg-linear-to-b from-white via-white to white/50 bg-clip-text text-transparent text-md md:text-lg lg:text-xl xl:text-2xl">
                  #GithubUnwrapped
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={handleGithubClick}
                >
                  <FaGithub className="text-xl" />
                  <span className="hidden sm:inline">Source code</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {!showWrapped && <GitHubWrappedFooter />}
    </div>
  );
};

export default GitHubWrappedPage;
