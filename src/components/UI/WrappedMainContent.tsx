import React from "react";
import GitHubWrappedSlides from "@/components/GitHubWrapped/SlideContainer";

interface WrappedMainContentProps {
  username: string;
}

const WrappedMainContent: React.FC<WrappedMainContentProps> = ({
  username,
}) => {
  return (
    <main className="w-full h-screen overflow-auto">
      <GitHubWrappedSlides username={username} />
    </main>
  );
};

export default WrappedMainContent;
