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
    <div className="w-full text-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-80">
        <div className="space-y-4">
          {topLanguages.length > 0 ? (
            topLanguages.map((lang, index) => (
              <LanguageItem
                key={index}
                language={lang.language}
                percentage={lang.percentage}
                className="py-3 "
              />
            ))
          ) : (
            <p className="text-lg md:text-xl lg:text-2xl text-white/50">
              No language data available
            </p>
          )}
        </div>

        {topLanguages.length > 0 && (
          <div className="space-y-4 max-h-full overflow-y-auto pr-2 border border-white/20 p-2 rounded-xl">
            {topLanguages.map((lang, index) => {
              const allLanguageToRepos =
                data.repositories.languageToRepos || {};
              const reposWithLanguage = allLanguageToRepos[lang.language] || [];

              const sortedRepos = [...reposWithLanguage].sort(
                (a, b) => b.bytes - a.bytes,
              );

              return (
                <div
                  key={index}
                  className="border border-white/20 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h5 className="font-bold text-white">{lang.language}</h5>
                    <span className="text-sm text-white/80">
                      {sortedRepos.length} repos
                    </span>
                  </div>
                  <div className="text-sm text-gray-300 space-y-1 max-h-32 overflow-y-auto">
                    {sortedRepos.slice(0, 3).map((repoData, repoIndex) => (
                      <div
                        key={repoIndex}
                        className="flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          <span className="mr-2 text-white/80">•</span>
                          <span className="truncate text-white/80">
                            {repoData.repo.name}
                          </span>
                        </div>
                        <span className="text-xs text-white/50 ml-2">
                          {repoData.bytes.toLocaleString()} bytes
                        </span>
                      </div>
                    ))}
                    {sortedRepos.length > 3 && (
                      <div className="text-white/50">
                        +{sortedRepos.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-8 md:mt-12 text-center">
        <p className="text-lg md:text-xl lg:text-2xl text-white/50">
          {[
            `Your code spans across`,
            `You've used`,
            `Your coding journey includes`,
            `You've mastered`,
            `Your projects feature`,
            `Your development toolkit includes`,
            `Your codebase spans`,
            `Your language diversity:`,
            `Your coding landscape:`,
            `Your polyglot coding:`
          ][Math.floor(Math.random() * 10)]}{" "}
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
