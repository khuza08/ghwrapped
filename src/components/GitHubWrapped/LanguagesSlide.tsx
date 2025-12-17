import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import languageColors from "@/lib/languageColors.json";

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

// Function to get language color based on GitHub's language colors from linguist
const getLanguageColor = (language: string): string => {
  return languageColors[language] || '#888888'; // Default gray if language not found
};

const LanguagesSlide: React.FC<WrappedSlideProps> = ({ data }) => {
  const { repositories } = data;

  // Get top 5 languages
  const topLanguages = repositories.languageBreakdown.slice(0, 5);

  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-100 mb-4 md:mb-6">
        Your Languages in 2024
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2 mb-4 md:mb-6">
          {topLanguages.length > 0 ? (
            topLanguages.map((lang, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 md:p-3 lg:p-4 bg-white/5 border border-white/20 rounded-lg text-xs md:text-sm lg:text-base"
              >
                <div className="flex items-center">
                  <div
                    className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full mr-2 md:mr-3"
                    style={{ backgroundColor: getLanguageColor(lang.language) }}
                  ></div>
                  <span className="font-medium text-gray-200">
                    {lang.language}
                  </span>
                </div>
                <div className="text-gray-400">{lang.percentage}%</div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm md:text-base lg:text-lg">
              No language data available
            </p>
          )}
        </div>

        {topLanguages.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-300 text-xs md:text-sm lg:text-base mb-3 lg:mb-4">
              Language Distribution
            </h4>
            <div className="space-y-3 lg:space-y-4">
              {topLanguages.map((lang, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 rounded-full mr-2 lg:mr-3"
                    style={{ backgroundColor: getLanguageColor(lang.language) }}
                  ></div>
                  <div className="flex-1 text-left">
                    <div className="w-full bg-gray-700 rounded-full h-2 md:h-3 lg:h-4">
                      <div
                        className="h-2 md:h-3 lg:h-4 rounded-full"
                        style={{
                          width: `${lang.percentage}%`,
                          backgroundColor: getLanguageColor(lang.language),
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-xs md:text-sm lg:text-base font-medium">
                    {lang.percentage}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 md:mt-8 lg:mt-12 text-center">
        <p className="text-xs md:text-sm lg:text-base text-gray-400">
          You coded in{" "}
          <span className="font-semibold">
            {repositories.languageBreakdown.length}
          </span>{" "}
          different languages
        </p>
      </div>
    </div>
  );
};

export default LanguagesSlide;