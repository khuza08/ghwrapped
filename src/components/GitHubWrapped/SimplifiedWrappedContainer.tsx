import React, { useState, useEffect } from "react";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import ErrorDisplay from "@/components/UI/ErrorDisplay";
import ResponsiveSidebar from "@/components/UI/ResponsiveSidebar";
import SlideNavigation from "@/components/GitHubWrapped/SlideNavigation";
import { getSlides } from "./slidesConfig";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundSelector from "@/components/UI/BackgroundSelector";
import { useBackground } from "@/components/UI/BackgroundContext";

interface SimplifiedWrappedContainerProps {
  username: string;
  data: any; // Pass data as prop instead of fetching
  onBackClick?: () => void;
}

const SimplifiedWrappedContainer: React.FC<SimplifiedWrappedContainerProps> = ({
  username,
  data,
  onBackClick,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0); // 0 for initial, 1 for next, -1 for previous
  const { background, isBackgroundSelectorOpen, toggleBackgroundSelector } = useBackground();

  // get slides from the slides config to ensure consistency
  const slideData = getSlides();
  const slides = slideData.map((slide) => ({
    id: slide.id,
    title: slide.title,
  }));

  // check if current slide is the banner slide
  const isBannerSlide = slideData[currentSlide]?.id === 'banner';

  const goToPrevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((prev) => prev - 1);
    }
  };

  const goToNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setDirection(1);
      setCurrentSlide((prev) => prev + 1);
    }
  };

  const handleSlideSelect = (index: number) => {
    if (index !== currentSlide) {
      setDirection(index > currentSlide ? 1 : -1);
      setCurrentSlide(index);
    }
  };

  // reset direction after slide change completes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(0);
    }, 300); // match the animation duration

    return () => clearTimeout(timer);
  }, [currentSlide]);

  // show loading if no data is provided
  if (!data) {
    return <LoadingSpinner />;
  }

  // get the current slide component
  const CurrentSlideComponent = slideData[currentSlide].component;

  return (
    <div
      className="relative flex flex-col w-full h-screen"
      style={
        isBannerSlide && background !== 'none' ? {
          backgroundImage: (background.startsWith('linear-gradient') || background.startsWith('url') || background.startsWith('data:image') || background.startsWith('http')) ?
                           background.startsWith('data:image') ? `url(${background})` : // For data URLs, wrap in url()
                           background : undefined,
          backgroundColor: !background.startsWith('linear-gradient') && !background.startsWith('url') && !background.startsWith('data:image') && !background.startsWith('http') ? background : undefined,
          backgroundSize: (background.startsWith('url') || background.startsWith('data:image') || background.startsWith('http')) ? 'cover' : undefined,
          backgroundPosition: (background.startsWith('url') || background.startsWith('data:image') || background.startsWith('http')) ? 'center' : undefined,
          backgroundRepeat: (background.startsWith('url') || background.startsWith('data:image') || background.startsWith('http')) ? 'no-repeat' : undefined,
        } : {}
      }
    >
      <div className="flex-1 overflow-hidden relative">
        <div className="w-full h-full overflow-hidden relative py-6">
          {/* header */}
          <div className="absolute left-6 right-6 z-10 flex flex-row justify-between items-center">
            <h2 className="bg-white/5 border border-white/20 py-2 px-6 rounded-full text-xl lg:text-2xl font-bold text-white/80">
              {slides[currentSlide].title}
            </h2>
            <div className="bg-white/5 border border-white/20 py-2 px-6 rounded-full text-sm text-white/50 flex items-center gap-2">
              {currentSlide + 1} / {slides.length}
              {isBannerSlide && (
                <button
                  onClick={toggleBackgroundSelector}
                  className="ml-2 p-1 bg-white/10 rounded border border-white/20 text-white/80 hover:bg-white/20"
                  title="Background Selector"
                >
                  🎨
                </button>
              )}
            </div>
          </div>

          {/* slide content - now properly centered with animations */}
          <div className="w-full h-full flex items-center justify-center overflow-y-auto overflow-x-hidden relative">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentSlide}
                initial={{
                  x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: direction > 0 ? "-100%" : direction < 0 ? "100%" : 0,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                className=" flex items-center justify-center"
              >
                <CurrentSlideComponent data={data} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <ResponsiveSidebar
          username={username}
          data={data}
          onBackClick={onBackClick || (() => window.history.back())}
          currentSlide={currentSlide}
          goToPrevSlide={goToPrevSlide}
          goToNextSlide={goToNextSlide}
          isBannerSlide={isBannerSlide}
        />
      </div>
      <SlideNavigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onPrev={goToPrevSlide}
        onNext={goToNextSlide}
        onSlideSelect={handleSlideSelect}
        slides={slides}
      />

      {isBackgroundSelectorOpen && (
        <BackgroundSelector
          onClose={toggleBackgroundSelector}
        />
      )}
    </div>
  );
};

export default SimplifiedWrappedContainer;
