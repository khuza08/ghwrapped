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
        // Temporarily change bg-black/5 to bg-[#222222] for export
        const elementsToChange = element.querySelectorAll('[class*="bg-black/5"]');
        const originalClasses: { element: Element; originalClass: string }[] = [];

        elementsToChange.forEach(el => {
          const classList = Array.from(el.classList);
          if (classList.includes('bg-black/5')) {
            originalClasses.push({
              element: el,
              originalClass: el.className
            });
            // Replace bg-black/5 with bg-[#222222]
            el.className = el.className.replace('bg-black/5', 'bg-[#222222]');
          }
        });

        const dataUrl = await toPng(element, {
          skipFonts: true,
          cacheBust: true,
          pixelRatio: window.devicePixelRatio || 2, // Better quality for high DPI screens
        });

        // Restore original classes after export
        originalClasses.forEach(({ element, originalClass }) => {
          element.className = originalClass;
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
        className="px-4 py-2 border border-white/20 bg-white/5 hover:bg-purple-900/50 hover:border-purple-600 text-white font-bold rounded-full shadow backdrop-blur-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 text-sm w-full flex items-center justify-center gap-2"
        title="Export Wrapped Image"
      >
        <FiDownload size={16} />
      </button>
      <button
        onClick={handleExportBanner}
        className="px-4 py-2 border border-white/20 bg-white/5 hover:bg-blue-900/50 hover:border-blue-600 text-white font-bold rounded-full shadow backdrop-blur-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm w-full flex items-center justify-center gap-2"
        title="Export Banner"
      >
        <FiMonitor size={16} />
      </button>
    </div>
  );
};

export default ExportButtons;
