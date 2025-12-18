"use client";

import React from "react";

interface SlideNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onSlideSelect: (index: number) => void;
  slides: Array<{ id: string; title: string }>;
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onSlideSelect,
  slides,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/20 backdrop-blur-sm p-4 border-t border-white/20 z-20">
      <div className="flex flex-row items-center justify-between gap-3 max-w-6xl mx-auto px-4">
        <button
          onClick={onPrev}
          disabled={currentSlide === 0}
          className={`px-4 py-2 rounded-lg ${
            currentSlide === 0
              ? "bg-white/5 text-white/50 cursor-not-allowed"
              : "bg-white/10 text-white hover:bg-white/5"
          }`}
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => onSlideSelect(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white/70" : "bg-white/20"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={onNext}
          disabled={currentSlide === totalSlides - 1}
          className={`px-4 py-2 rounded-lg ${
            currentSlide === totalSlides - 1
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

export default SlideNavigation;