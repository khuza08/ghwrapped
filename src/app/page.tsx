"use client";

import React, { useState } from "react";
import { normalizeUsername } from "@/lib/utils";
import { ERROR_MESSAGES } from "@/lib/constants";
import GitHubWrappedHeader from "@/components/UI/GitHubWrappedHeader";
import UsernameForm from "@/components/UI/UsernameForm";
import WrappedSidebar from "@/components/UI/WrappedSidebar";
import WrappedMainContent from "@/components/UI/WrappedMainContent";
import GitHubWrappedFooter from "@/components/UI/GitHubWrappedFooter";
import { FaGithub } from "react-icons/fa";

const GitHubWrappedPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showWrapped, setShowWrapped] = useState(false);

  const checkUserExists = async (username: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/github/${username}`);

      return response.ok;
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
      <div className="max-w-full mx-auto w-full grow flex flex-col">
        {showWrapped ? (
          <>
            <GitHubWrappedHeader />
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              <div className="lg:w-1/4 xl:w-1/5 shrink-0">
                <WrappedSidebar
                  username={username}
                  onBackClick={() => setShowWrapped(false)}
                />
              </div>

              <div className="lg:w-3/4 xl:w-4/5">
                <WrappedMainContent username={normalizeUsername(username)} />
              </div>
            </div>
          </>
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

      <GitHubWrappedFooter />
    </div>
  );
};

export default GitHubWrappedPage;
