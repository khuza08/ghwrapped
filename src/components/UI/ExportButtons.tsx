import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { toPng } from "html-to-image";
import { FiDownload, FiMonitor } from "react-icons/fi";

interface ExportButtonsProps {
  data: GitHubWrappedData;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ data }) => {
  const { user } = data;

  const handleExportImage = async (selector: string, filename: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      try {
        const dataUrl = await toPng(element, {
          skipFonts: true,
        });

        const link = document.createElement("a");
        link.download = filename;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error generating image:", error);
        alert("Error generating image. Please try again.");
      }
    }
  };

  const handleExportWrappedImage = () => {
    handleExportImage(
      "[data-export-wrapped]",
      `github-wrapped-${user.login}-2024.png`,
    );
  };

  const handleExportBanner = () => {
    handleExportImage(
      "[data-export-banner]",
      `github-wrapped-${user.login}-2024-banner.png`,
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sticky top-0 shrink-0 max-w-xs w-full">
      <button
        onClick={handleExportWrappedImage}
        className="px-4 py-2 border border-white/20 bg-white/5 hover:bg-purple-900/50 hover:border-purple-600 text-white font-bold rounded-full shadow backdrop-blur-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-sm w-full flex items-center justify-center gap-2"
        title="Export Wrapped Image"
      >
        <FiDownload size={16} />
      </button>
      <button
        onClick={handleExportBanner}
        className="px-4 py-2 border border-white/20 bg-white/5 hover:bg-blue-900/50 hover:border-blue-600 text-white font-bold rounded-full shadow t backdrop-blur-lg transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm w-full flex items-center justify-center gap-2"
        title="Export Banner"
      >
        <FiMonitor size={16} />
      </button>
    </div>
  );
};

export default ExportButtons;
