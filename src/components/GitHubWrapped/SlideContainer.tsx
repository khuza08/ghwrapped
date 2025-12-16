'use client';

import React, { useState, useEffect } from 'react';
import { GitHubWrappedData } from '@/lib/types';
import SummarySlide from '@/components/GitHubWrapped/SummarySlide';
import CommitsSlide from '@/components/GitHubWrapped/CommitsSlide';
import LanguagesSlide from '@/components/GitHubWrapped/LanguagesSlide';
import ReposSlide from '@/components/GitHubWrapped/ReposSlide';
import PersonalitySlide from '@/components/GitHubWrapped/PersonalitySlide';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import ErrorDisplay from '@/components/UI/ErrorDisplay';
import { useWrappedData } from '@/hooks/useWrappedData';

interface GitHubWrappedSlidesProps {
  username: string;
}

const GitHubWrappedSlides: React.FC<GitHubWrappedSlidesProps> = ({ username }) => {
  const { data, loading, error } = useWrappedData(username);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 'summary', component: SummarySlide, title: 'Summary' },
    { id: 'commits', component: CommitsSlide, title: 'Commits' },
    { id: 'languages', component: LanguagesSlide, title: 'Languages' },
    { id: 'repos', component: ReposSlide, title: 'Repos' },
    { id: 'personality', component: PersonalitySlide, title: 'Your Coding Style' },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorDisplay error={error} onRetry={() => window.location.reload()} />;
  }

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            {slides[currentSlide].title}
          </h2>
          <div className="text-sm text-gray-500">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        <div className="flex items-center justify-center min-h-[400px] sm:min-h-[500px] p-2 sm:p-4">
          <CurrentSlideComponent data={data} />
        </div>
      </div>

      <div className="bg-gray-50 p-4 sm:px-6 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
          disabled={currentSlide === 0}
          className={`px-4 py-2 rounded-lg w-full sm:w-auto ${
            currentSlide === 0
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Previous
        </button>

        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide(prev => Math.min(slides.length - 1, prev + 1))}
          disabled={currentSlide === slides.length - 1}
          className={`px-4 py-2 rounded-lg w-full sm:w-auto ${
            currentSlide === slides.length - 1
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GitHubWrappedSlides;