"use client";

import React, { useEffect, useState } from "react";
import { GitHubWrappedData } from "@/lib/types";
import DecryptedText from "@/components/UI/DecryptedText";

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
    // Animation effect to count up to the total commits
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

  // Start sentence decrypt after username decrypt finishes
  useEffect(() => {
    if (usernameDecrypted) {
      const timer = setTimeout(() => {
        setSentenceDecrypted(true);
      }, 300); // Small delay after username decrypt
      return () => clearTimeout(timer);
    }
  }, [usernameDecrypted]);

  // Start contributions after sentence and counting finish
  useEffect(() => {
    if (sentenceDecrypted && count === totalCommits) {
      const timer = setTimeout(() => {
        setContributionsVisible(true);
      }, 1800); // Delay after number finishes counting
      return () => clearTimeout(timer);
    }
  }, [sentenceDecrypted, count, totalCommits]);

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
      <div className="flex flex-col items-center text-center pointer-events-auto">
        <div className="mb-2 font-bold text-sm md:text-base text-white/80 flex items-center gap-2">
          <DecryptedText
            text={`${data.user?.name || "Elza The Great"}`}
            speed={100}
            maxIterations={6}
            sequential={true}
            revealDirection="start"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz "
            animateOn="view"
            className=""
            encryptedClassName="text-white/80"
          />
          <DecryptedText
            text={`(@${data.user?.login || "elza the great"})`}
            speed={30}
            maxIterations={6}
            sequential={true}
            revealDirection="start"
            characters="abcdefghijklmnopqrstuvwxyz0123456789_"
            animateOn="view"
            className=""
            encryptedClassName="text-white/80"
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
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"
            animateOn={sentenceDecrypted ? "view" : "hover"}
            className="font-mono tracking-wider text-white/50 transition-all duration-300"
            encryptedClassName="font-mono tracking-wider text-white/50 transition-all duration-600"
          />
        </div>

        <div
          className="font-bold bg-gradient-to-r from-white/40 via-white/80 to-white/40 bg-clip-text text-transparent"
          style={{
            fontSize: "clamp(48px, 18vw, 12rem)",
            lineHeight: 1,
            marginBottom: "16px",
          }}
        >
          <span>{count.toLocaleString()}</span>
        </div>

        <div className="text-xl md:text-2xl text-white/90 font-bold">
          <DecryptedText
            text="CONTRIBUTIONS"
            speed={40}
            maxIterations={10}
            sequential={true}
            revealDirection="center"
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            animateOn={contributionsVisible ? "view" : "hover"}
            className="font-bold"
            encryptedClassName="text-white/60"
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
