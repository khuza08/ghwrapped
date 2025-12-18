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
    <div className="w-full max-w-6xl mx-auto text-center">
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100 mb-4">Your Developer Profile</h3>
      <p className="text-lg md:text-xl lg:text-2xl text-gray-400 mb-6 md:mb-8">Based on your GitHub activity in 2024</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 mb-10">
        <PersonalityCard
          emoji={scheduleDetails.emoji}
          title={scheduleDetails.title}
          description={scheduleDetails.description}
          className="p-6"
        />
        <PersonalityCard
          emoji={activityDetails.emoji}
          title={activityDetails.title}
          description={activityDetails.description}
          className="p-6"
        />
      </div>

      {personality.badges.length > 0 && (
        <div className="mb-10 lg:mb-12">
          <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 mb-6">Your Badges</h4>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 lg:gap-8">
            {personality.badges.map((badge, index) => (
              <Badge
                key={index}
                text={badge}
                className="text-lg md:text-xl lg:text-2xl p-3"
              />
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 lg:mt-12">
        <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-300 mb-4 lg:mb-6">Your Coding Style</h4>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
          With <span className="font-bold text-gray-100 text-xl md:text-2xl lg:text-3xl">{summary.totalCommits}</span> commits this year,
          you're a <span className="font-semibold text-gray-100 text-xl md:text-2xl lg:text-3xl">{personality.title.toLowerCase()}.</span>
        </p>
      </div>
    </div>
  );
};

export default PersonalitySlide;