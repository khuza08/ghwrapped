"use client";

import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    <div className="fixed bottom-0 left-0 right-0 p-4 z-20">
      <div className="max-w-6xl mx-auto px-6 py-6 ">
        <div className="flex flex-row items-center justify-center gap-2">
          <button
            onClick={onPrev}
            disabled={currentSlide === 0}
            className={`p-3 backdrop-blur-xl ${
              currentSlide === 0
                ? "bg-white/5 rounded-full border border-white/20 text-white/50 cursor-not-allowed"
                : "bg-white/10 rounded-full border border-white/20 text-white hover:bg-white/5"
            }`}
            aria-label="Previous slide"
          >
            <IoIosArrowBack className="w-6 h-6" />
          </button>

          <div className="flex space-x-3 px-4 py-4 bg-white/5 border border-white/20 rounded-full backdrop-blur-xl">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => onSlideSelect(index)}
                className={`w-4 h-4 rounded-full ${
                  index === currentSlide ? "bg-white/80" : "bg-white/20"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={onNext}
            disabled={currentSlide === totalSlides - 1}
            className={`p-3 backdrop-blur-xl ${
              currentSlide === totalSlides - 1
                ? "bg-white/20 rounded-full border border-white/20 text-white/50 cursor-not-allowed"
                : "bg-white/10 rounded-full border border-white/20 text-white hover:bg-white/5 transition"
            }`}
            aria-label="Next slide"
          >
            <IoIosArrowForward className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideNavigation;
