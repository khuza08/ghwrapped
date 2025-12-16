import React from "react";

interface GitHubWrappedHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const GitHubWrappedHeader: React.FC<GitHubWrappedHeaderProps> = ({
  title = "GitHub Wrapped",
  subtitle = "Discover your GitHub year in review! Enter your username to see your coding stats, top languages, contributions, and more.",
  className = "mb-6 md:mb-8 lg:mb-12",
}) => {
  return (
    <header className={`text-center shrink-0 py-6 ${className}`}>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-6xl font-extrabold text-white mb-2 sm:mb-3">
        <span className="text-white">{title}</span>
      </h1>
      <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl max-w-2xl lg:max-w-3xl mx-auto px-4 text-white/80">
        {subtitle}
      </p>
    </header>
  );
};

export default GitHubWrappedHeader;
