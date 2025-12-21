import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { toPng } from "html-to-image";
import { FiDownload, FiMonitor } from "react-icons/fi";
import { useBackground } from "./BackgroundContext";

interface ExportButtonsProps {
  data: GitHubWrappedData;
}

const ExportButtons: React.FC<ExportButtonsProps> = ({ data }) => {
  const { user } = data;
  const { background } = useBackground();

  const handleExportImage = async (selector: string, filename: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      try {
        // Store original classes and styles to restore later
        const originalData: Array<{
          element: Element;
          originalClass: string;
          originalStyle?: string;
          originalBackground?: string;
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
              originalBackground: el.style.background,
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
                originalBackground: bannerElement.style.background,
              });
            }

            // Apply the change to main banner container
            bannerElement.className = bannerElement.className.replaceAll('bg-white/5', 'bg-[#242424]');
            bannerElement.style.setProperty('background-color', '#242424', 'important');
          }
        }

        // Capture the banner as an image
        const bannerDataUrl = await toPng(element, {
          skipFonts: true,
          cacheBust: true,
          pixelRatio: window.devicePixelRatio || 5, // Better quality for high DPI screens
        });

        // Restore original classes and styles after capturing banner
        originalData.forEach(({ element, originalClass, originalStyle, originalBackground }) => {
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
          // Restore background if it was changed
          if (originalBackground !== undefined) {
            element.style.background = originalBackground;
          }
        });

        // If it's a banner export and background is selected, create composite image
        if (isBannerExport && background !== 'none') {
          // Create a canvas with 1080x1920 dimensions (portrait HD)
          const canvas = document.createElement('canvas');
          canvas.width = 1080;
          canvas.height = 1920;
          const ctx = canvas.getContext('2d');

          if (ctx) {
            // Draw background based on selected background type
            if (!background.startsWith('linear-gradient') && !background.startsWith('url') && !background.startsWith('data:image') && !background.startsWith('http')) {
              // Solid color background
              ctx.fillStyle = background;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else if (background.startsWith('linear-gradient')) {
              // Create gradient background from linear-gradient string
              const colorMatch = background.match(/linear-gradient\([^)]*,\s*([^,)]+),\s*([^,)]+)\s*\)/i);
              if (colorMatch && colorMatch[1] && colorMatch[2]) {
                const startColor = colorMatch[1].trim();
                const endColor = colorMatch[2].trim();

                // Create vertical gradient from top to bottom
                const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              } else {
                // Default to dark background if gradient can't be parsed
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }
            } else {
              // Image background
              const img = new Image();
              img.crossOrigin = 'anonymous';
              img.src = background;

              try {
                // Wait for background image to load
                await new Promise((resolve, reject) => {
                  img.onload = () => {
                    // Scale and center background image to fill canvas
                    const aspectRatio = img.width / img.height;
                    const canvasRatio = canvas.width / canvas.height;

                    let drawWidth, drawHeight, offsetX, offsetY;

                    if (aspectRatio > canvasRatio) {
                      drawHeight = canvas.height;
                      drawWidth = img.width * (drawHeight / img.height);
                      offsetX = (canvas.width - drawWidth) / 2;
                      offsetY = 0;
                    } else {
                      drawWidth = canvas.width;
                      drawHeight = img.height * (drawWidth / img.width);
                      offsetX = 0;
                      offsetY = (canvas.height - drawHeight) / 2;
                    }

                    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
                    resolve(null);
                  };
                  img.onerror = reject;
                });
              } catch (error) {
                console.error("Error loading background image:", error);
                // Fallback to dark background if image fails to load
                ctx.fillStyle = '#1a1a1a';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }
            }

            // Draw the banner in the center of the canvas
            const bannerImg = new Image();
            bannerImg.crossOrigin = 'anonymous';

            try {
              // Wait for banner image to load
              await new Promise((resolve, reject) => {
                bannerImg.onload = () => {
                  // Calculate banner size (90% of canvas width, maintaining aspect ratio)
                  const bannerAspectRatio = bannerImg.width / bannerImg.height;
                  let bannerWidth = canvas.width * 0.9;
                  let bannerHeight = bannerWidth / bannerAspectRatio;

                  // If height is too large, scale based on height instead
                  if (bannerHeight > canvas.height * 0.9) {
                    bannerHeight = canvas.height * 0.9;
                    bannerWidth = bannerHeight * bannerAspectRatio;
                  }

                  // Center the banner
                  const bannerX = (canvas.width - bannerWidth) / 2;
                  const bannerY = (canvas.height - bannerHeight) / 2;

                  // Draw the banner image
                  ctx.drawImage(bannerImg, bannerX, bannerY, bannerWidth, bannerHeight);

                  // Convert canvas to data URL and download
                  const compositeDataUrl = canvas.toDataURL('image/png');
                  const link = document.createElement("a");
                  link.download = filename;
                  link.href = compositeDataUrl;
                  link.click();

                  resolve(null);
                };
                bannerImg.onerror = reject;
                bannerImg.src = bannerDataUrl;
              });
            } catch (error) {
              console.error("Error loading banner image:", error);
              alert("Error loading banner image for export. Please try again.");
            }
          }
        } else {
          // If no background or not banner export, use original approach
          const link = document.createElement("a");
          link.download = filename;
          link.href = bannerDataUrl;
          link.click();
        }
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
