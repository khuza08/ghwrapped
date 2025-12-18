"use client";

import React, { useState } from "react";
import GitHubWrappedHeader from "@/components/UI/GitHubWrappedHeader";
import GitHubWrappedSlides from "@/components/GitHubWrapped/SlideContainer";
import ResponsiveSidebar from "@/components/UI/ResponsiveSidebar";
import SlideNavigation from "@/components/GitHubWrapped/SlideNavigation";
import { useWrappedData } from "@/hooks/useWrappedData";
import { normalizeUsername } from "@/lib/utils";
import { getSlides } from "@/components/GitHubWrapped/slidesConfig";

interface WrappedViewProps {
  username: string;
  onBackClick: () => void;
}

const WrappedView: React.FC<WrappedViewProps> = ({ username, onBackClick }) => {
  const normalizedUsername = normalizeUsername(username);
  const { data, loading, error } = useWrappedData(normalizedUsername);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Get slides from the slides config to ensure consistency
  const slideData = getSlides();
  const slides = slideData.map(slide => ({ id: slide.id, title: slide.title }));

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => Math.max(0, prev - 1));
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1));
  };

  const handleSlideSelect = (index: number) => {
    setCurrentSlide(index);
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
    <div className="relative flex flex-col h-full">
      <div className="flex-1 overflow-hidden relative">
        <GitHubWrappedSlides
          username={normalizedUsername}
          currentSlide={currentSlide}
          setCurrentSlide={setCurrentSlide}
        />
        <ResponsiveSidebar
          username={username}
          data={data}
          onBackClick={onBackClick}
          currentSlide={currentSlide}
          goToPrevSlide={goToPrevSlide}
          goToNextSlide={goToNextSlide}
        />
      </div>
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={goToPrevSlide}
        onNext={goToNextSlide}
        onSlideSelect={handleSlideSelect}
        slides={slides}
      />
    </div>
  );
};

export default WrappedView;
