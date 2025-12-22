import React from "react";
import languageColors from "@/lib/languageColors.json";

interface LanguageBarProps {
  language: string;
  percentage: number;
}

// Type the languageColors import properly
const typedLanguageColors: { [key: string]: string } = languageColors;

const getLanguageColor = (language: string): string => {
  return typedLanguageColors[language] || "#888888"; // Default gray if language not found
};

const LanguageBar: React.FC<LanguageBarProps> = ({ language, percentage }) => {
  return (
    <div className="flex items-center">
      <div
        className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full mr-2 lg:mr-3"
        style={{ backgroundColor: getLanguageColor(language) }}
      ></div>
      <div className="flex-1 text-left">
        <div className="w-full bg-white/5 rounded-full h-2 md:h-3 lg:h-4">
          <div
            className="h-2 md:h-3 lg:h-4 rounded-full"
            style={{
              width: `${percentage}%`,
              backgroundColor: getLanguageColor(language),
            }}
          ></div>
        </div>
      </div>
      <div className="w-12 text-right text-xs md:text-sm lg:text-base font-medium">
        {percentage}%
      </div>
    </div>
  );
};

export default LanguageBar;
