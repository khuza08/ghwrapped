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
    <div className="w-full max-w-2xl mx-auto text-center">
      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Your Developer Profile</h3>
      <p className="text-xs md:text-sm text-gray-600 mb-4">Based on your GitHub activity in 2024</p>

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 md:p-4 rounded-xl mb-4">
        <div className="text-2xl md:text-4xl mb-1">{scheduleDetails.emoji}</div>
        <h4 className="text-base md:text-lg font-bold text-gray-800">{scheduleDetails.title}</h4>
        <p className="text-xs md:text-sm text-gray-600 mt-1">{scheduleDetails.description}</p>
      </div>

      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-3 md:p-4 rounded-xl mb-4">
        <div className="text-2xl md:text-4xl mb-1">{activityDetails.emoji}</div>
        <h4 className="text-base md:text-lg font-bold text-gray-800">{activityDetails.title}</h4>
        <p className="text-xs md:text-sm text-gray-600 mt-1">{activityDetails.description}</p>
      </div>

      {personality.badges.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2">Your Badges</h4>
          <div className="flex flex-wrap justify-center gap-1 md:gap-2">
            {personality.badges.map((badge, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs md:text-sm font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2">Your Commit Style</h4>
        <p className="text-xs md:text-sm text-gray-700">
          With <span className="font-bold">{summary.totalCommits}</span> commits this year,
          you're a {personality.title.toLowerCase()}.
        </p>
      </div>
    </div>
  );
};

export default PersonalitySlide;