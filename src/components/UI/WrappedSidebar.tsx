import React from 'react';
import { normalizeUsername } from '@/lib/utils';

interface WrappedSidebarProps {
  username: string;
  onBackClick: () => void;
}

const WrappedSidebar: React.FC<WrappedSidebarProps> = ({ 
  username, 
  onBackClick 
}) => {
  return (
    <div className="bg-gray-800 rounded-2xl p-4 sm:p-6 sticky top-6 border border-gray-700">
      <div className="flex flex-col justify-between items-center mb-4">
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-100 text-center">
          @{normalizeUsername(username)}'s
        </h2>
        <h3 className="text-sm sm:text-base font-semibold text-gray-300">
          GitHub Wrapped
        </h3>
        <button
          onClick={onBackClick}
          className="mt-4 px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-400 hover:text-gray-200 bg-gray-700 rounded-lg"
        >
          ← Change User
        </button>
      </div>
    </div>
  );
};

export default WrappedSidebar;