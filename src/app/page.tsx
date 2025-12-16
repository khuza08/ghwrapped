"use client";

import React, { useState } from "react";
import { normalizeUsername } from "@/lib/utils";
import { ERROR_MESSAGES } from "@/lib/constants";
import GitHubWrappedHeader from "@/components/UI/GitHubWrappedHeader";
import UsernameForm from "@/components/UI/UsernameForm";
import WrappedSidebar from "@/components/UI/WrappedSidebar";
import WrappedMainContent from "@/components/UI/WrappedMainContent";
import GitHubWrappedFooter from "@/components/UI/GitHubWrappedFooter";

const GitHubWrappedPage = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [showWrapped, setShowWrapped] = useState(false);

  const handleSubmit = (username: string) => {
    setError("");
    setShowWrapped(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white py-6 px-4 lg:px-8 xl:px-16">
      <div className="max-w-full mx-auto flex-grow w-full">
        <GitHubWrappedHeader />

        {!showWrapped ? (
          <UsernameForm
            username={username}
            error={error}
            setUsername={setUsername}
            setError={setError}
            onSubmit={handleSubmit}
          />
        ) : (
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
        )}
      </div>

      <GitHubWrappedFooter />
    </div>
  );
};

export default GitHubWrappedPage;
