"use client";

import React from "react";
import GitHubWrappedHeader from "@/components/UI/GitHubWrappedHeader";
import WrappedMainContent from "@/components/UI/WrappedMainContent";
import DraggableSidebar from "@/components/UI/DraggableSidebar";
import { useWrappedData } from "@/hooks/useWrappedData";
import { normalizeUsername } from "@/lib/utils";

interface WrappedViewProps {
  username: string;
  onBackClick: () => void;
}

const WrappedView: React.FC<WrappedViewProps> = ({ username, onBackClick }) => {
  const normalizedUsername = normalizeUsername(username);
  const { data, loading, error } = useWrappedData(normalizedUsername);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500">
          Error loading data: {error?.message || "Unknown error"}
        </p>
      </div>
    );
  }

  return (
    <>
      <DraggableSidebar
        username={username}
        data={data}
        onBackClick={onBackClick}
      />
      <div className="relative">
        <div className="">
          <div className="pt-16 lg:pt-0">
            <WrappedMainContent username={normalizedUsername} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WrappedView;
