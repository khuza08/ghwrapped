import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  const borderSize = {
    sm: "border-2",
    md: "border-4",
    lg: "border-4",
  };

  return (
    <div className="flex items-center justify-center w-full h-full min-h-[300px]">
      <div
        className={`${sizeClasses[size]} ${borderSize[size]} border-t-white/30 border-r-white/50 border-b-white/60 border-l-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
