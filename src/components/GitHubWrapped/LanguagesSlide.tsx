import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { formatNumber } from "@/lib/utils";
import LanguageItem from "@/components/UI/reusable/LanguageItem";
import LanguageBar from "@/components/UI/reusable/LanguageBar";

interface WrappedSlideProps {
  data: GitHubWrappedData;
}

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
              <LanguageItem
                key={index}
                language={lang.language}
                percentage={lang.percentage}
              />
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
                <LanguageBar
                  key={index}
                  language={lang.language}
                  percentage={lang.percentage}
                />
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