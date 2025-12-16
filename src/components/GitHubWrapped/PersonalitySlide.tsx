import React from 'react';
import { GitHubWrappedData } from '@/lib/types';
import { ACTIVITY_TYPES, PERSONALITY_TYPES } from '@/lib/constants';

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

const PersonalitySlide: React.FC<WrappedSlideProps> = ({ data }) => {
  const { personality, summary } = data;

  // Get the personality details
  const scheduleDetails = PERSONALITY_TYPES[personality.codingSchedule];
  const activityDetails = ACTIVITY_TYPES[personality.activityType];

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Your Developer Profile</h3>
      <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-4">Based on your GitHub activity in 2024</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 md:p-4 lg:p-6 rounded-xl">
          <div className="text-xl lg:text-4xl mb-1 lg:mb-2">{scheduleDetails.emoji}</div>
          <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">{scheduleDetails.title}</h4>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-1">{scheduleDetails.description}</p>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 md:p-4 lg:p-6 rounded-xl">
          <div className="text-xl lg:text-4xl mb-1 lg:mb-2">{activityDetails.emoji}</div>
          <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">{activityDetails.title}</h4>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-1">{activityDetails.description}</p>
        </div>
      </div>

      {personality.badges.length > 0 && (
        <div className="mb-6">
          <h4 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-800 mb-3">Your Badges</h4>
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 lg:gap-3">
            {personality.badges.map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 md:px-3 md:py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm lg:text-base font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4 lg:mt-6">
        <h4 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-800 mb-2">Your Commit Style</h4>
        <p className="text-xs md:text-sm lg:text-base text-gray-700">
          With <span className="font-bold">{summary.totalCommits}</span> commits this year,
          you're a {personality.title.toLowerCase()}.
        </p>
      </div>
    </div>
  );
};

export default PersonalitySlide;