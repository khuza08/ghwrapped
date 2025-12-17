import React from 'react';
import { GitHubWrappedData } from '@/lib/types';
import { PERSONALITY_TYPES, ACTIVITY_TYPES } from '@/lib/constants';
import PersonalityCard from '@/components/UI/reusable/PersonalityCard';
import Badge from '@/components/UI/reusable/Badge';

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
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-100 mb-2">Your Developer Profile</h3>
      <p className="text-xs md:text-sm lg:text-base text-gray-400 mb-4 md:mb-6">Based on your GitHub activity in 2024</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6">
        <PersonalityCard
          emoji={scheduleDetails.emoji}
          title={scheduleDetails.title}
          description={scheduleDetails.description}
        />
        <PersonalityCard
          emoji={activityDetails.emoji}
          title={activityDetails.title}
          description={activityDetails.description}
        />
      </div>

      {personality.badges.length > 0 && (
        <div className="mb-6 lg:mb-8">
          <h4 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-300 mb-3">Your Badges</h4>
          <div className="flex flex-wrap justify-center gap-1 md:gap-2 lg:gap-3">
            {personality.badges.map((badge, index) => (
              <Badge
                key={index}
                text={badge}
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 lg:mt-8">
        <h4 className="text-sm md:text-lg lg:text-xl font-semibold text-gray-300 mb-2 lg:mb-3">Your Coding Style</h4>
        <p className="text-xs md:text-sm lg:text-base text-gray-300">
          With <span className="font-bold text-gray-100">{summary.totalCommits}</span> commits this year,
          you're a <span className="font-semibold text-gray-100">{personality.title.toLowerCase()}.</span>
        </p>
      </div>
    </div>
  );
};

export default PersonalitySlide;