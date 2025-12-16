import React from 'react';

const GitHubWrappedFooter: React.FC = () => {
  return (
    <footer className="mt-8 sm:mt-12 text-center text-gray-500 text-xs sm:text-sm">
      <p>GitHub Wrapped • Made with ❤️ and code</p>
      <p className="mt-1 sm:mt-2">
        This project uses only public GitHub data. No login required.
      </p>
    </footer>
  );
};

export default GitHubWrappedFooter;