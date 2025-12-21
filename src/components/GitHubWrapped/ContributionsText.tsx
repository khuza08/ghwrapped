import React, { useState, useEffect } from "react";

interface ContributionsTextProps {
  totalCommits: number;
  currentCount: number;
  totalDuration: number;
  characters?: string;
}

const ContributionsText: React.FC<ContributionsTextProps> = ({
  totalCommits,
  currentCount,
  totalDuration,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+",
}) => {
  const text = "CONTRIBUTIONS";
  const availableChars = characters;
  const [displayText, setDisplayText] = useState(text);

  // scrambled characters for non-revealed positions
  const [scrambledChars] = useState<string[]>(() => {
    return text
      .split("")
      .map(
        () => availableChars[Math.floor(Math.random() * availableChars.length)],
      );
  });

  useEffect(() => {
    // cal display text based on progress (always runs during counting)
    const progress = totalCommits > 0 ? currentCount / totalCommits : 0;
    const targetRevealedCount = Math.min(
      Math.floor(progress * text.length),
      text.length,
    );

    // create revealed characters based on progress
    const newDisplayText = text
      .split("")
      .map((char, i) => {
        if (i < targetRevealedCount) {
          return char;
        } else {
          return scrambledChars[i];
        }
      })
      .join("");

    setDisplayText(newDisplayText);
  }, [currentCount, totalCommits, text, scrambledChars]);

  // show the calculated display text based on progress
  return <span>{displayText}</span>;
};

export default ContributionsText;
