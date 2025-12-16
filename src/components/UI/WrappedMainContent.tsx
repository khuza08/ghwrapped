import React from 'react';
import GitHubWrappedSlides from '@/components/GitHubWrapped/SlideContainer';

interface WrappedMainContentProps {
  username: string;
}

const WrappedMainContent: React.FC<WrappedMainContentProps> = ({
  username
}) => {
  return (
    <main className="bg-gray-800 rounded-2xl p-4 sm:p-6 border border-gray-700 flex-grow">
      <GitHubWrappedSlides username={username} />
    </main>
  );
};

export default WrappedMainContent;