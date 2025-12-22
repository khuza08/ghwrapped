import React from "react";
import { GitHubWrappedData } from "@/lib/types";
import { toPng } from "html-to-image";
import { FiArrowDown } from "react-icons/fi";
import { useBackground } from "./BackgroundContext";

interface ExportButtonsProps {
  data: GitHubWrappedData;
  isBannerSlide?: boolean; // lets the component know if we're on the banner slide
}

const ExportButtons: React.FC<ExportButtonsProps> = ({
  data,
  isBannerSlide = false,
}) => {
  const { user } = data;
  const { background } = useBackground();

  const handleExportImage = async (selector: string, filename: string) => {
    const element = document.querySelector(selector) as HTMLElement;
    if (element) {
      try {
        const originalData: Array<{
          element: Element;
          originalClass: string;
          originalStyle?: string;
          originalBackground?: string;
        }> = [];

        const isBannerExport = selector.includes("data-export-banner");

        const allElements = element.querySelectorAll("*");

        allElements.forEach((el) => {
          const hasBlackClass = el.classList.contains("bg-black/5");
          const hasWhiteClass = el.classList.contains("bg-white/5");

          if (hasBlackClass || hasWhiteClass) {
            originalData.push({
              element: el,
              originalClass: el.className,
              originalStyle: el.getAttribute("style") || undefined,
              originalBackground: (el as HTMLElement).style?.background,
            });
          }
        });

        originalData.forEach(({ element }) => {
          const hasBlackClass = element.classList.contains("bg-black/5");
          const hasWhiteClass = element.classList.contains("bg-white/5");

          // Remove the original Tailwind classes and add the solid colors
          // Also disable transitions to ensure immediate color change
          if (hasBlackClass) {
            element.classList.remove("bg-black/5");
            element.classList.add("bg-[#222222]");
            (element as HTMLElement).style.setProperty("background-color", "#222222", "important");
            (element as HTMLElement).style.setProperty("transition", "none", "important");
          }

          if (hasWhiteClass) {
            element.classList.remove("bg-white/5");
            element.classList.add("bg-[#242424]");
            (element as HTMLElement).style.setProperty("background-color", "#242424", "important");
            (element as HTMLElement).style.setProperty("transition", "none", "important");
          }
        });

        if (isBannerExport) {
          const bannerElement = element; // The element itself is the banner container
          if (bannerElement.classList.contains("bg-white/5")) {
            const existingOriginal = originalData.find(
              (item) => item.element === bannerElement,
            );
            if (!existingOriginal) {
              originalData.push({
                element: bannerElement,
                originalClass: bannerElement.className,
                originalStyle: bannerElement.getAttribute("style") || undefined,
                originalBackground: (bannerElement as HTMLElement).style?.background,
              });
            }

            bannerElement.classList.remove("bg-white/5");
            bannerElement.classList.add("bg-[#242424]");
            (bannerElement as HTMLElement).style.setProperty(
              "background-color",
              "#242424",
              "important",
            );
            (bannerElement as HTMLElement).style.setProperty(
              "transition",
              "none",
              "important",
            );
          }
        }

        if (isBannerExport && background !== "none") {
          // Wait a bit to ensure DOM changes are applied before capturing image
          await new Promise(resolve => setTimeout(resolve, 100));

          const bannerDataUrl = await toPng(element, {
            skipFonts: true,
            cacheBust: true,
            pixelRatio: window.devicePixelRatio || 5,
          });

          const canvas = document.createElement("canvas");
          canvas.width = 1080;
          canvas.height = 1920;
          const ctx = canvas.getContext("2d");

          if (ctx) {
            if (
              !background.startsWith("linear-gradient") &&
              !background.startsWith("url") &&
              !background.startsWith("data:image") &&
              !background.startsWith("http")
            ) {
              ctx.fillStyle = background;
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else if (background.startsWith("linear-gradient")) {
              const colorMatch = background.match(
                /linear-gradient\([^)]*,\s*([^,)]+),\s*([^,)]+)\s*\)/i,
              );
              if (colorMatch && colorMatch[1] && colorMatch[2]) {
                const startColor = colorMatch[1].trim();
                const endColor = colorMatch[2].trim();

                const gradient = ctx.createLinearGradient(
                  0,
                  0,
                  0,
                  canvas.height,
                );
                gradient.addColorStop(0, startColor);
                gradient.addColorStop(1, endColor);

                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              } else {
                ctx.fillStyle = "#1a1a1a";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }
            } else {
              const img = new Image();
              img.crossOrigin = "anonymous";
              img.src = background;

              try {
                await new Promise((resolve, reject) => {
                  img.onload = () => {
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
                ctx.fillStyle = "#1a1a1a";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }
            }

            const bannerImg = new Image();
            bannerImg.crossOrigin = "anonymous";

            try {
              await new Promise((resolve, reject) => {
                bannerImg.onload = () => {
                  const bannerAspectRatio = bannerImg.width / bannerImg.height;
                  let bannerWidth = canvas.width * 0.9;
                  let bannerHeight = bannerWidth / bannerAspectRatio;

                  if (bannerHeight > canvas.height * 0.9) {
                    bannerHeight = canvas.height * 0.9;
                    bannerWidth = bannerHeight * bannerAspectRatio;
                  }

                  const bannerX = (canvas.width - bannerWidth) / 2;
                  const bannerY = (canvas.height - bannerHeight) / 2;

                  ctx.drawImage(
                    bannerImg,
                    bannerX,
                    bannerY,
                    bannerWidth,
                    bannerHeight,
                  );

                  const compositeDataUrl = canvas.toDataURL("image/png");
                  const link = document.createElement("a");
                  link.download = filename;
                  link.href = compositeDataUrl;
                  link.click();

                  // Restore original styles after everything is done
                  originalData.forEach(
                    ({ element, originalClass, originalStyle, originalBackground }) => {
                      // Get the original classes and restore them
                      element.className = originalClass;

                      // Restore original style attributes
                      if (originalStyle !== undefined) {
                        if (originalStyle) {
                          element.setAttribute("style", originalStyle);
                        } else {
                          element.removeAttribute("style");
                        }
                      } else {
                        element.removeAttribute("style");
                      }

                      // Restore original background if it existed
                      if (originalBackground !== undefined) {
                        (element as HTMLElement).style.background = originalBackground;
                      }
                    },
                  );

                  resolve(null);
                };
                bannerImg.onerror = reject;
                bannerImg.src = bannerDataUrl;
              });
            } catch (error) {
              console.error("Error loading banner image:", error);
              alert("Error loading banner image for export. Please try again.");

              // Restore original styles even if there's an error
              originalData.forEach(
                ({ element, originalClass, originalStyle, originalBackground }) => {
                  // Get the original classes and restore them
                  element.className = originalClass;

                  // Restore original style attributes
                  if (originalStyle !== undefined) {
                    if (originalStyle) {
                      element.setAttribute("style", originalStyle);
                    } else {
                      element.removeAttribute("style");
                    }
                  } else {
                    element.removeAttribute("style");
                  }

                  // Restore original background if it existed
                  if (originalBackground !== undefined) {
                    (element as HTMLElement).style.background = originalBackground;
                  }
                },
              );
            }
          }
        } else {
          // Wait a bit to ensure DOM changes are applied before capturing image
          await new Promise(resolve => setTimeout(resolve, 100));

          const bannerDataUrl = await toPng(element, {
            skipFonts: true,
            cacheBust: true,
            pixelRatio: window.devicePixelRatio || 5,
          });

          // Restore original styles after getting the image
          originalData.forEach(
            ({ element, originalClass, originalStyle, originalBackground }) => {
              // Get the original classes and restore them
              element.className = originalClass;

              // Restore original style attributes
              if (originalStyle !== undefined) {
                if (originalStyle) {
                  element.setAttribute("style", originalStyle);
                } else {
                  element.removeAttribute("style");
                }
              } else {
                element.removeAttribute("style");
              }

              // Restore original background if it existed
              if (originalBackground !== undefined) {
                (element as HTMLElement).style.background = originalBackground;
              }
            },
          );

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

  const handleExportBanner = () => {
    handleExportImage(
      "[data-export-banner]",
      `github-wrapped-${user.login}-2024-banner.png`,
    );
  };

  return (
    <div className=" gap-3 sticky top-0 shrink-0 max-w-xs w-full">
      {isBannerSlide && (
        <button
          onClick={handleExportBanner}
          className="px-4 py-2 border border-white/20 bg-white/5 hover:bg-blue-900/50 hover:border-blue-600 text-white font-bold rounded-full shadow backdrop-blur-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-sm w-full flex items-center justify-center gap-2"
          title="Export Banner"
        >
          <FiArrowDown size={16} />
        </button>
      )}
    </div>
  );
};

export default ExportButtons;
