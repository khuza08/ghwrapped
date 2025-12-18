"use client";

import React, { useEffect, useState } from "react";
import { GitHubWrappedData } from "@/lib/types";
import DecryptedText from "@/components/UI/DecryptedText";
import ContributionsText from "./ContributionsText";

interface CommitsCounterSlideProps {
  data: GitHubWrappedData;
}

const CommitsCounterSlide: React.FC<CommitsCounterSlideProps> = ({ data }) => {
  const [count, setCount] = useState(0);
  const [usernameDecrypted, setUsernameDecrypted] = useState(false);
  const [sentenceDecrypted, setSentenceDecrypted] = useState(false);
  const [contributionsVisible, setContributionsVisible] = useState(false);
  const totalCommits = data.summary?.totalCommits || 0;
  const duration = 1560; // Animation duration in ms
  const frameDuration = 1000 / 60; // ~60fps
  const totalFrames = Math.round(duration / frameDuration);

  useEffect(() => {
    const increment = totalCommits / totalFrames;
    let frameCounter = 0;
    const timer = setInterval(() => {
      frameCounter++;
      setCount(Math.ceil(increment * frameCounter));

      if (frameCounter >= totalFrames) {
        clearInterval(timer);
        setCount(totalCommits);
      }
    }, frameDuration);

    return () => clearInterval(timer);
  }, [totalCommits, totalFrames, frameDuration]);

  useEffect(() => {
    if (usernameDecrypted) {
      const timer = setTimeout(() => {
        setSentenceDecrypted(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [usernameDecrypted]);

  useEffect(() => {
    if (count === totalCommits) {
      setContributionsVisible(true);
    }
  }, [count, totalCommits]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="flex flex-col items-center text-center pointer-events-auto">
        <div className="mb-2 font-bold text-sm md:text-base text-white/80 flex items-center gap-2">
          <DecryptedText
            text={`${data.user?.name || "Elza The Great"}`}
            speed={25}
            maxIterations={6}
            sequential={true}
            revealDirection="start"
            characters="ABCDEFGHIJKLMhuzaQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
            animateOn="view"
            className=""
            encryptedClassName="text-white/50"
          />
          <DecryptedText
            text={`(@${data.user?.login || "elza the great"})`}
            speed={30}
            maxIterations={6}
            sequential={true}
            revealDirection="start"
            characters="abcdefghijklELZAnopqrstuvwxyz0123456789_"
            animateOn="view"
            className=""
            encryptedClassName="text-white/50"
            onRevealComplete={() => setUsernameDecrypted(true)}
          />
        </div>

        <div className="text-base md:text-lg text-white/50">
          <DecryptedText
            text={
              [
                `IN ${new Date().getFullYear()}, YOU MADE...`,
                `THIS YEAR, YOU CONTRIBUTED...`,
                `YOUR ${new Date().getFullYear()} COUNT...`,
                `CONTRIBUTIONS IN ${new Date().getFullYear()}...`,
                `YOUR ${new Date().getFullYear()} RECAP...`,
                `TOTAL IN ${new Date().getFullYear()}...`,
                `YOUR EFFORT IN ${new Date().getFullYear()}...`,
                `YOUR ${new Date().getFullYear()} IMPACT...`,
                `YOUR ${new Date().getFullYear()} GITHUB LEGACY...`,
                `YOUR COMMIT JOURNEY IN ${new Date().getFullYear()}...`,
                `YOUR ${new Date().getFullYear()} GITHUB STAMPS...`,
                `YOUR ${new Date().getFullYear()} CODE FOOTPRINT...`,
              ][Math.floor(Math.random() * 12)]
            }
            speed={40}
            maxIterations={10}
            sequential={true}
            revealDirection="start"
            characters="ABCDEFGHIJKLMNOPQHUZAVWXYZ0123456789!@#$%^&*()_+"
            animateOn={sentenceDecrypted ? "view" : "hover"}
            className="font-mono tracking-wider text-white/50 transition-all duration-300"
            encryptedClassName="font-mono tracking-wider text-white/50 transition-all duration-600"
          />
        </div>

        <div
          className="font-bold bg-linear-to-r from-white/40 via-white/80 to-white/40 bg-clip-text text-transparent"
          style={{
            fontSize: "clamp(48px, 18vw, 12rem)",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          <span>{count.toLocaleString()}</span>
        </div>

        <div className="text-xl md:text-2xl text-white/90 font-bold">
          <ContributionsText
            totalCommits={totalCommits}
            currentCount={count}
            totalDuration={duration}
            characters="ABCDEFGHIJKLMELZARSTUVWXYZ0123456789!@#$%^&*()_+"
          />
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
    </div>
  );
};

export default CommitsCounterSlide;
