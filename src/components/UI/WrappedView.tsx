"use client";

import React from "react";
import GitHubWrappedHeader from "@/components/UI/GitHubWrappedHeader";
import WrappedSidebar from "@/components/UI/WrappedSidebar";
import WrappedMainContent from "@/components/UI/WrappedMainContent";
import ExportButtons from "@/components/UI/ExportButtons";
import { useWrappedData } from "@/hooks/useWrappedData";
import { normalizeUsername } from "@/lib/utils";

interface WrappedViewProps {
  username: string;
  onBackClick: () => void;
}

const WrappedView: React.FC<WrappedViewProps> = ({ username, onBackClick }) => {
  const normalizedUsername = normalizeUsername(username);
  const { data } = useWrappedData(normalizedUsername);

  return (
    <>
      <GitHubWrappedHeader />
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <div className="lg:w-1/4 xl:w-1/5 shrink-0 flex flex-col">
          <WrappedSidebar
            username={username}
            onBackClick={onBackClick}
          />
          {/* Export buttons shown only on desktop/large screens */}
          <div className="hidden lg:block mt-4">
            {data && <ExportButtons data={data} />}
          </div>
        </div>

        <div className="lg:w-3/4 xl:w-4/5">
          <WrappedMainContent username={normalizedUsername} />
        </div>
      </div>
      {/* Export buttons shown on mobile below the content */}
      <div className="lg:hidden mt-4 w-full max-w-xs mx-auto">
        {data && <ExportButtons data={data} />}
      </div>
    </>
  );
};

export default WrappedView;