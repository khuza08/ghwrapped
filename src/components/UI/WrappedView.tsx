"use client";

import React, { useState } from "react";
import GitHubWrappedHeader from "@/components/UI/GitHubWrappedHeader";
import WrappedMainContent from "@/components/UI/WrappedMainContent";
import ResponsiveSidebar from "@/components/UI/ResponsiveSidebar";
import { useWrappedData } from "@/hooks/useWrappedData";
import { normalizeUsername } from "@/lib/utils";

interface WrappedViewProps {
  username: string;
  onBackClick: () => void;
}

const WrappedView: React.FC<WrappedViewProps> = ({ username, onBackClick }) => {
  const normalizedUsername = normalizeUsername(username);
  const { data, loading, error } = useWrappedData(normalizedUsername);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const goToNextSlide = () => {
    // Define the slide count based on the same slides array in GitHubWrappedSlides
    const totalSlides = 7; // Based on the slides array in GitHubWrappedSlides
    setCurrentSlide((prev) => Math.min(totalSlides - 1, prev + 1));
  };

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
      <ResponsiveSidebar
        username={username}
        data={data}
        onBackClick={onBackClick}
        currentSlide={currentSlide}
        goToPrevSlide={goToPrevSlide}
        goToNextSlide={goToNextSlide}
      />
      <div className="relative">
        <div className="">
          <div>
            <WrappedMainContent
              username={normalizedUsername}
              currentSlide={currentSlide}
              setCurrentSlide={setCurrentSlide}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default WrappedView;
