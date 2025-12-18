import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { toPng } from "html-to-image";

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
    <div className="mt-4 flex flex-col gap-3 sticky top-0 shrink-0">
      <button
        onClick={handleExportWrappedImage}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-sm"
      >
        📷 Export Wrapped Image
      </button>
      <button
        onClick={handleExportBanner}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm"
      >
        📱 Export Banner
      </button>
    </div>
  );
};

export default ExportButtons;
