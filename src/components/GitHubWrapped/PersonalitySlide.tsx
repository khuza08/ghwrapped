import React from 'react';
import { GitHubWrappedData } from '@/lib/types';
import { PERSONALITY_TYPES, ACTIVITY_TYPES } from '@/lib/constants';
import { getGrayColor, getSubtleGrayColor } from '@/lib/grayscale';

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
      <p className="text-xs md:text-sm lg:text-base text-gray-600 mb-4 md:mb-6">Based on your GitHub activity in 2024</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        <div className="bg-gray-100 p-3 md:p-4 lg:p-6 rounded-xl">
          <div className="text-2xl md:text-3xl lg:text-4xl mb-1 md:mb-2">{scheduleDetails.emoji}</div>
          <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">{scheduleDetails.title}</h4>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-1">{scheduleDetails.description}</p>
        </div>
        
        <div className="bg-gray-100 p-3 md:p-4 lg:p-6 rounded-xl">
          <div className="text-2xl md:text-3xl lg:text-4xl mb-1 md:mb-2">{activityDetails.emoji}</div>
          <h4 className="text-base md:text-lg lg:text-xl font-bold text-gray-800">{activityDetails.title}</h4>
          <p className="text-xs md:text-sm lg:text-base text-gray-600 mt-1">{activityDetails.description}</p>
        </div>
      </div>
      
      {personality.badges.length > 0 && (
        <div className="mb-4 md:mb-6">
          <h4 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-800 mb-2 md:mb-3">Your Badges</h4>
          <div className="flex flex-wrap justify-center gap-1 md:gap-2">
            {personality.badges.map((badge, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-gray-200 text-gray-800 rounded-full text-xs md:text-sm"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="mt-4 md:mt-6">
        <h4 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-800 mb-2">Your Coding Style</h4>
        <p className="text-xs md:text-sm lg:text-base text-gray-700">
          With <span className="font-bold">{summary.totalCommits}</span> commits this year, 
          you're a <span className="font-semibold">{personality.title.toLowerCase()}.</span>
        </p>
      </div>
    </div>
  );
};

export default PersonalitySlide;