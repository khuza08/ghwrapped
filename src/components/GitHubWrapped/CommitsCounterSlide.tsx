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
    const duration = 1500; // Animation duration in ms
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
    <div className="w-full max-w-3xl mx-auto p-4 flex flex-col items-center justify-center text-center">
      <div className="mb-4 text-sm md:text-base text-white/70">
        @{data.user?.username || 'User'}
      </div>

      <div className="mb-6 text-base md:text-lg text-white/80">
        IN 2024, YOU MADE...
      </div>

      <div className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
        {count.toLocaleString()}
      </div>

      <div className="mb-8 text-xl md:text-2xl text-white/90 font-medium">
        CONTRIBUTIONS
      </div>

      <div className="mb-12 px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white/90">
        YOU'RE ON FIRE! 🔥
      </div>

      <div className="flex justify-center gap-2">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-white/40"
            style={{
              animation: `0.6s ease-in-out ${i * 0.1}s infinite bounce`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
};

export default CommitsCounterSlide;