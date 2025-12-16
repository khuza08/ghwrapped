import React from "react";

interface GitHubWrappedHeaderProps {
  title?: string;
  subtitle?: string;
  className?: string;
}

const GitHubWrappedHeader: React.FC<GitHubWrappedHeaderProps> = ({
  title = "GitHub Wrapped",
  subtitle = "Discover your GitHub year in review! Enter your username to see your coding stats, top languages, contributions, and more.",
  className = "mb-6 md:mb-8",
}) => {
  return (
    <header className={`text-center shrink-0 py-6 ${className}`}>
      <h1 className="text-xl sm:text-xl md:text-2xl lg:text-3xl font-extrabold bg-linear-to-b from-white via-white to-white/50 bg-clip-text text-transparent sm:mb-2">
        <span>{title}</span>
      </h1>
      <p className="text-xs sm:text-sm md:text-base lg:text-md max-w-lg lg:max-w-lg mx-auto px-4 text-white/80">
        {subtitle}
      </p>
    </header>
  );
};

export default GitHubWrappedHeader;
