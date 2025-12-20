import React, { useState } from "react";
import { GitHubWrappedData } from "@/lib/types";
import { useWrappedData } from "@/hooks/useWrappedData";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import ErrorDisplay from "@/components/UI/ErrorDisplay";
import ResponsiveSidebar from "@/components/UI/ResponsiveSidebar";
import SlideNavigation from "@/components/GitHubWrapped/SlideNavigation";
import { getSlides } from "./slidesConfig";
import CommitsCounterSlide from "./CommitsCounterSlide";

interface SimplifiedWrappedContainerProps {
  username: string;
  onBackClick?: () => void;
}

const SimplifiedWrappedContainer: React.FC<SimplifiedWrappedContainerProps> = ({ 
  username,
  onBackClick
}) => {
  const { data, loading, error } = useWrappedData(username);
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
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return (
      <ErrorDisplay error={error} onRetry={() => window.location.reload()} />
    );
  }

  // Get the current slide component
  const CurrentSlideComponent = slideData[currentSlide].component;

  return (
    <div className="relative flex flex-col w-full h-screen bg-[#0a0a0a]">
      <div className="flex-1 overflow-hidden relative">
        <div className="w-full h-full overflow-hidden relative py-6">
          {/* Header */}
          <div className="absolute left-6 right-6 z-10 flex flex-row justify-between items-center">
            <h2 className="bg-white/5 border border-white/20 py-2 px-6 rounded-full text-xl lg:text-2xl font-bold text-white/80">
              {slides[currentSlide].title}
            </h2>
            <div className="bg-white/5 border border-white/20 py-2 px-6 rounded-full text-sm text-white/50">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
          
          {/* Slide Content */}
          <div className="w-full h-full flex flex-col">
            <div className="flex-1 flex items-center overflow-hidden">
              <div className="w-full h-full flex items-center justify-center p-4 lg:p-8">
                <CurrentSlideComponent data={data} />
              </div>
            </div>
          </div>
        </div>
        
        <ResponsiveSidebar
          username={username}
          data={data}
          onBackClick={onBackClick || (() => window.history.back())}
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

export default SimplifiedWrappedContainer;