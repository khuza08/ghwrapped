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
    <div className="w-full max-w-6xl mx-auto text-center">
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-100 mb-6 md:mb-8">
        Your Languages in 2024
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4 mb-6 md:mb-8">
          {topLanguages.length > 0 ? (
            topLanguages.map((lang, index) => (
              <LanguageItem
                key={index}
                language={lang.language}
                percentage={lang.percentage}
                className="py-3"
              />
            ))
          ) : (
            <p className="text-lg md:text-xl lg:text-2xl text-gray-400">
              No language data available
            </p>
          )}
        </div>

        {topLanguages.length > 0 && (
          <div>
            <h4 className="font-semibold text-gray-300 text-lg md:text-xl lg:text-2xl mb-6">
              Language Distribution
            </h4>
            <div className="space-y-6">
              {topLanguages.map((lang, index) => (
                <LanguageBar
                  key={index}
                  language={lang.language}
                  percentage={lang.percentage}
                  className="h-8 md:h-10 lg:h-12"
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 md:mt-12 lg:mt-16 text-center">
        <p className="text-lg md:text-xl lg:text-2xl text-gray-400">
          You coded in{" "}
          <span className="font-semibold text-xl md:text-2xl lg:text-3xl">
            {repositories.languageBreakdown.length}
          </span>{" "}
          different languages
        </p>
      </div>
    </div>
  );
};

export default LanguagesSlide;