"use client";

import React, { useState, useEffect } from "react";
import { GitHubWrappedData } from "@/lib/types";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import ErrorDisplay from "@/components/UI/ErrorDisplay";
import { useWrappedData } from "@/hooks/useWrappedData";
import { getSlides } from "./slidesConfig";

interface GitHubWrappedSlidesProps {
  username: string;
  currentSlide?: number;
  setCurrentSlide?: React.Dispatch<React.SetStateAction<number>>;
}

const GitHubWrappedSlides: React.FC<GitHubWrappedSlidesProps> = ({
  username,
  currentSlide: propCurrentSlide,
  setCurrentSlide: propSetCurrentSlide,
}) => {
  const { data, loading, error } = useWrappedData(username);
  const [localCurrentSlide, setLocalCurrentSlide] = useState(0);

  // Use prop if provided, otherwise use local state
  const currentSlide =
    propCurrentSlide !== undefined ? propCurrentSlide : localCurrentSlide;
  const setCurrentSlide = propSetCurrentSlide || setLocalCurrentSlide;

  const slides = getSlides();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );
  }

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-full max-w-4xl mx-auto p-4 lg:p-8 h-full flex flex-col">
        <div className="flex flex-row justify-between items-center mb-4 gap-2">
          <h2 className="text-xl lg:text-2xl font-bold text-white/80">
            {slides[currentSlide].title}
          </h2>
          <div className="text-sm text-white/50">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        <div className="flex-1 flex items-center overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <CurrentSlideComponent data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GitHubWrappedSlides;
