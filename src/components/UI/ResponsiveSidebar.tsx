import React, { useState, useEffect } from "react";
import { GitHubWrappedData } from "@/lib/types";
import DraggableSidebar from "@/components/UI/DraggableSidebar";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoHome } from "react-icons/go";

interface ResponsiveSidebarProps {
  username: string;
  data: GitHubWrappedData;
  onBackClick: () => void;
  currentSlide?: number;
  goToPrevSlide?: () => void;
  goToNextSlide?: () => void;
  isBannerSlide?: boolean;
}

const ResponsiveSidebar: React.FC<ResponsiveSidebarProps> = ({
  username,
  data,
  onBackClick,
  currentSlide,
  goToPrevSlide,
  goToNextSlide,
  isBannerSlide = false,
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // make sure we're running on the client
    setIsClient(true);

    const checkIfMobile = () => {
      // check for mobile/tablet using window.innerWidth
      setIsMobile(window.innerWidth < 1024); // lg breakpoint
    };

    // run on initial render
    checkIfMobile();

    // add event listener for window resize
    const handleResize = () => {
      checkIfMobile();
    };

    window.addEventListener("resize", handleResize);

    // cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // render mobile/tablet navigation arrows
  if (!isClient) {
    // on the server, default to desktop until client-side detection is complete
    return (
      <DraggableSidebar
        username={username}
        data={data}
        onBackClick={onBackClick}
      />
    );
  }

  if (isMobile) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <div className="flex space-x-2 bg-white/10 backdrop-blur-xl rounded-full p-2 border border-white/20">
          <button
            onClick={goToPrevSlide}
            disabled={currentSlide === 0}
            className={`p-3 rounded-full transition flex items-center justify-center ${
              currentSlide === 0
                ? "text-white/40 cursor-not-allowed"
                : "text-white/80 hover:text-white"
            }`}
            aria-label="Previous slide"
          >
            <IoIosArrowBack size={24} />
          </button>
          <button
            onClick={onBackClick}
            className="p-3 text-white/80 hover:text-white rounded-full transition flex items-center justify-center"
            aria-label="Go to home"
          >
            <GoHome size={20} />
          </button>
          <button
            onClick={goToNextSlide}
            disabled={currentSlide === 7} // 7 is the last slide index (0-7)
            className={`p-3 rounded-full transition flex items-center justify-center ${
              currentSlide === 7
                ? "text-white/40 cursor-not-allowed"
                : "text-white/80 hover:text-white"
            }`}
            aria-label="Next slide"
          >
            <IoIosArrowForward size={24} />
          </button>
        </div>
      </div>
    );
  }

  // render desktop draggable sidebar
  return (
    <DraggableSidebar
      username={username}
      data={data}
      onBackClick={onBackClick}
      currentSlide={currentSlide}
      goToPrevSlide={goToPrevSlide}
      goToNextSlide={goToNextSlide}
      isBannerSlide={isBannerSlide}
    />
  );
};

export default ResponsiveSidebar;