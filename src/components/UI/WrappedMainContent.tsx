import React from "react";
import GitHubWrappedSlides from "@/components/GitHubWrapped/SlideContainer";

interface WrappedMainContentProps {
  username: string;
  currentSlide: number;
  setCurrentSlide: React.Dispatch<React.SetStateAction<number>>;
}

const WrappedMainContent: React.FC<WrappedMainContentProps> = ({
  username,
  currentSlide,
  setCurrentSlide,
}) => {
  return (
    <main className="w-full flex-grow overflow-auto">
      <GitHubWrappedSlides
        username={username}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    </main>
  );
};

export default WrappedMainContent;
