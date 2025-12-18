"use client";

import React from "react";
import GitHubWrappedHeader from "@/components/UI/GitHubWrappedHeader";
import WrappedMainContent from "@/components/UI/WrappedMainContent";
import FixedSidebar from "@/components/UI/FixedSidebar";
import ExportButtons from "@/components/UI/ExportButtons";
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
      <FixedSidebar username={username} onBackClick={onBackClick} />
      <div className="relative">
        <div className="fixed left-4 top-40 z-40">
          {" "}
          <ExportButtons data={data} />
        </div>
        <div className="">
          <GitHubWrappedHeader />
          <div className="pt-16 lg:pt-0">
            <WrappedMainContent username={normalizedUsername} />
          </div>
        </div>
      </div>
    </>
  );
};

export default WrappedView;
