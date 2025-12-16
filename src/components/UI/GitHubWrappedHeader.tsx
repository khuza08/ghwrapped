import React from 'react';

interface GitHubWrappedHeaderProps {
  title?: string;
  subtitle?: string;
}

const GitHubWrappedHeader: React.FC<GitHubWrappedHeaderProps> = ({ 
  title = 'GitHub Wrapped', 
  subtitle = 'Discover your GitHub year in review! Enter your username to see your coding stats, top languages, contributions, and more.' 
}) => {
  return (
    <header className="text-center mb-6 md:mb-8 lg:mb-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-2 sm:mb-3">
        <span className="text-white">{title}</span>
      </h1>
      <p className="text-sm sm:text-base md:text-lg max-w-2xl lg:max-w-3xl mx-auto px-4 text-white/80">
        {subtitle}
      </p>
    </header>
  );
};

export default GitHubWrappedHeader;