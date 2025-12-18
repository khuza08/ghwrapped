import React, { useState, useEffect } from 'react';

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
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'
}) => {
  const text = 'CONTRIBUTIONS';
  const availableChars = characters;
  const [displayText, setDisplayText] = useState(text);

  // Initialize scrambled characters for non-revealed positions
  const [scrambledChars] = useState<string[]>(() => {
    return text.split('').map(() =>
      availableChars[Math.floor(Math.random() * availableChars.length)]
    );
  });

  useEffect(() => {
    // Calculate display text based on progress (always runs during counting)
    const progress = totalCommits > 0 ? currentCount / totalCommits : 0;
    const targetRevealedCount = Math.min(Math.floor(progress * text.length), text.length);

    // Create revealed characters based on progress
    const newDisplayText = text
      .split('')
      .map((char, i) => {
        if (i < targetRevealedCount) {
          return char; // Show actual character
        } else {
          return scrambledChars[i]; // Show consistent scrambled character
        }
      })
      .join('');

    setDisplayText(newDisplayText);
  }, [currentCount, totalCommits, text, scrambledChars]);

  // Always show the calculated display text based on progress
  return <span>{displayText}</span>;
};

export default ContributionsText;