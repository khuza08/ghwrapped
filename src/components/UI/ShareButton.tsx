'use client';

import React, { useState } from 'react';
import { GitHubWrappedData } from '@/lib/types';

interface ShareButtonProps {
  data: GitHubWrappedData;
  username: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ data, username }) => {
  const [isCopied, setIsCopied] = useState(false);

  const shareText = `Check out my GitHub Wrapped 2024! 🚀\n\n`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : `https://githubwrapped.example.com/${username}`;
  
  const handleShare = async () => {
    try {
      if (navigator.share) {
        // Web Share API is supported
        await navigator.share({
          title: 'My GitHub Wrapped 2024',
          text: shareText,
          url: shareUrl,
        });
      } else if (navigator.clipboard) {
        // Fallback to copying link to clipboard
        await navigator.clipboard.writeText(shareUrl);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } else {
        // Fallback: just select the URL text
        alert(`Copy this link to share: ${shareUrl}`);
      }
    } catch (error) {
      console.error('Error sharing:', error);
      alert('Failed to share. Copy the URL manually.');
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      <span className="mr-2">↗️</span>
      {isCopied ? 'Copied!' : 'Share'}
    </button>
  );
};

export default ShareButton;