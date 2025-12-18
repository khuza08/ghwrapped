"use client";

import React, { useState, useEffect } from "react";
import { GitHubWrappedData } from "@/lib/types";
import SummarySlide from "@/components/GitHubWrapped/SummarySlide";
import CommitsSlide from "@/components/GitHubWrapped/CommitsSlide";
import LanguagesSlide from "@/components/GitHubWrapped/LanguagesSlide";
import ReposSlide from "@/components/GitHubWrapped/ReposSlide";
import PersonalitySlide from "@/components/GitHubWrapped/PersonalitySlide";
import ImageExportSlide from "@/components/GitHubWrapped/ImageExportSlide";
import GitHubWrappedBanner from "@/components/GitHubWrapped/GitHubWrappedBanner";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import ErrorDisplay from "@/components/UI/ErrorDisplay";
import { useWrappedData } from "@/hooks/useWrappedData";

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

  const slides = [
    { id: "summary", component: SummarySlide, title: "Summary" },
    { id: "commits", component: CommitsSlide, title: "Commits" },
    { id: "languages", component: LanguagesSlide, title: "Languages" },
    { id: "repos", component: ReposSlide, title: "Repos" },
    {
      id: "personality",
      component: PersonalitySlide,
      title: "Your Coding Style",
    },
    {
      id: "image-export",
      component: ImageExportSlide,
      title: "Export Image",
    },
    {
      id: "banner",
      component: GitHubWrappedBanner,
      title: "Shareable Banner",
    },
  ];

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
    <div className="w-full h-auto max-h-fit overflow-auto">
      <div className="w-full p-4 lg:p-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-2 lg:mb-4 gap-2">
          <h2 className="text-xl lg:text-2xl font-bold text-white/80">
            {slides[currentSlide].title}
          </h2>
          <div className="text-sm text-white/50">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        <div className="flex items-center justify-center p-2 lg:p-4">
          <CurrentSlideComponent data={data} />
        </div>
      </div>

      {/* Only show the bottom navigation on larger screens, not on mobile */}
      <div className="hidden lg:flex flex-row items-center justify-between gap-3 sticky bottom-0 bg-black/20 backdrop-blur-sm p-4">
        <button
          onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className={`px-4 py-2 rounded-lg ${
            currentSlide === 0
              ? "bg-white/5 text-white/50 cursor-not-allowed"
              : "bg-white/10 text-white hover:bg-white/5"
          }`}
        >
          Previous
        </button>

        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white/50" : "bg-white/20"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentSlide((prev) => Math.min(slides.length - 1, prev + 1))
          }
          disabled={currentSlide === slides.length - 1}
          className={`px-4 py-2 rounded-lg ${
            currentSlide === slides.length - 1
              ? "bg-white/20 text-white/50 cursor-not-allowed"
              : "bg-white/10 text-white hover:bg-white/5 transition"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GitHubWrappedSlides;
