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
        // Store original classes and styles to restore later
        const originalData: Array<{
          element: Element;
          originalClass: string;
          originalStyle?: string;
        }> = [];

        // Check if we're exporting the banner specifically
        const isBannerExport = selector.includes('data-export-banner');

        // Find all elements that need color changes
        const allElements = element.querySelectorAll('*');

        // First pass: identify and store all elements with bg-black/5 or bg-white/5
        allElements.forEach((el) => {
          const hasBlackClass = el.classList.contains('bg-black/5');
          const hasWhiteClass = el.classList.contains('bg-white/5');

          if (hasBlackClass || hasWhiteClass) {
            // Store original class and style
            originalData.push({
              element: el,
              originalClass: el.className,
              originalStyle: el.getAttribute('style') || undefined,
            });
          }
        });

        // Second pass: apply all changes at once to prevent conflicts
        originalData.forEach(({ element }) => {
          const hasBlackClass = element.classList.contains('bg-black/5');
          const hasWhiteClass = element.classList.contains('bg-white/5');

          let newClassName = element.className;

          // Replace bg-black/5 with bg-[#222222]
          if (hasBlackClass) {
            newClassName = newClassName.replaceAll('bg-black/5', 'bg-[#222222]');
          }

          // Replace bg-white/5 with bg-[#242424]
          if (hasWhiteClass) {
            newClassName = newClassName.replaceAll('bg-white/5', 'bg-[#242424]');
          }

          // Apply modified class names
          element.className = newClassName;

          // Add inline styles with high specificity as backup
          if (hasBlackClass || hasWhiteClass) {
            element.style.setProperty('background-color', hasBlackClass ? '#222222' : '#242424', 'important');
          }
        });

        // Special handling for banner export - ensure main container is properly handled
        if (isBannerExport) {
          // The main banner element itself (with data-export-banner attribute)
          const bannerElement = element; // The element itself is the banner container
          if (bannerElement.classList.contains('bg-white/5')) {
            // Make sure main banner container gets the color change too
            const existingOriginal = originalData.find(item => item.element === bannerElement);
            if (!existingOriginal) {
              originalData.push({
                element: bannerElement,
                originalClass: bannerElement.className,
                originalStyle: bannerElement.getAttribute('style') || undefined,
              });
            }

            // Apply the change to main banner container
            bannerElement.className = bannerElement.className.replaceAll('bg-white/5', 'bg-[#242424]');
            bannerElement.style.setProperty('background-color', '#242424', 'important');
          }
        }

        const dataUrl = await toPng(element, {
          skipFonts: true,
          cacheBust: true,
          pixelRatio: window.devicePixelRatio || 5, // Better quality for high DPI screens
        });

        // Restore original classes and styles after export
        originalData.forEach(({ element, originalClass, originalStyle }) => {
          element.className = originalClass;
          if (originalStyle !== undefined) {
            if (originalStyle) {
              element.setAttribute('style', originalStyle);
            } else {
              element.removeAttribute('style');
            }
          } else {
            element.removeAttribute('style');
          }
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
