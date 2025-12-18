"use client";

import React, { useEffect, useState } from "react";
import { GitHubWrappedData } from "@/lib/types";

interface CommitsCounterSlideProps {
  data: GitHubWrappedData;
}

const CommitsCounterSlide: React.FC<CommitsCounterSlideProps> = ({ data }) => {
  const [count, setCount] = useState(0);
  const totalCommits = data.summary?.totalCommits || 0;

  useEffect(() => {
    // Animation effect to count up to the total commits
    const duration = 1560; // Animation duration in ms
    const frameDuration = 1000 / 60; // ~60fps
    const totalFrames = Math.round(duration / frameDuration);
    const increment = totalCommits / totalFrames;

    let currentFrame = 0;
    const timer = setInterval(() => {
      currentFrame++;
      setCount(Math.ceil(increment * currentFrame));

      if (currentFrame >= totalFrames) {
        clearInterval(timer);
        setCount(totalCommits);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [totalCommits]);

  return (
    <div className="w-full flex flex-col items-center text-center">
      <div className="mb-2 font-bold text-sm md:text-base text-white/80">
        @{data.user?.login || "elza the great"}
      </div>

      <div className="text-base md:text-lg text-white/50">
        IN {new Date().getFullYear()}, YOU MADE...
      </div>

      <div
        className="font-bold bg-gradient-to-r from-white/40 via-white/80 to-white/40 bg-clip-text text-transparent"
        style={{
          fontSize: "clamp(48px, 18vw, 12rem)",
          lineHeight: 1,
          marginBottom: "16px",
        }}
      >
        {count.toLocaleString()}
      </div>

      <div className="text-xl md:text-2xl text-white/90 font-bold">
        CONTRIBUTIONS
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
      `}</style>
    </div>
  );
};

export default CommitsCounterSlide;
