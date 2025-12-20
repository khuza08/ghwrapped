import React from "react";
import languageColors from "@/lib/languageColors.json";

interface LanguageItemProps {
  language: string;
  percentage: number;
}

const getLanguageColor = (language: string): string => {
  return languageColors[language] || "#888888"; // Default gray if language not found
};

const LanguageItem: React.FC<LanguageItemProps> = ({
  language,
  percentage,
}) => {
  return (
    <div className="flex items-center justify-between p-2 md:p-3 lg:p-4 bg-white/5 border border-white/20 rounded-lg text-xs md:text-sm lg:text-base hover:bg-white/10 transition">
      <div className="flex items-center">
        <div
          className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full mr-2 md:mr-3"
          style={{ backgroundColor: getLanguageColor(language) }}
        ></div>
        <span className="font-medium text-white/80">{language}</span>
      </div>
      <div className="text-white/50">{percentage}%</div>
    </div>
  );
};

export default LanguageItem;
