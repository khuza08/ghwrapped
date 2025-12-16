'use client';

import React from 'react';
import { toPng } from 'html-to-image';
import { RefObject } from 'react';

interface DownloadImageProps {
  elementRef: RefObject<HTMLDivElement>;
  filename: string;
  children: React.ReactNode;
}

const DownloadImage: React.FC<DownloadImageProps> = ({ elementRef, filename, children }) => {
  const downloadImage = async () => {
    if (!elementRef.current) {
      console.error('No element to capture');
      return;
    }

    try {
      const dataUrl = await toPng(elementRef.current, { 
        cacheBust: true,
        backgroundColor: '#ffffff',
      });
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to download image. Please try again.');
    }
  };

  return (
    <button
      onClick={downloadImage}
      className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
    >
      <span className="mr-2">📥</span>
      {children}
    </button>
  );
};

export default DownloadImage;