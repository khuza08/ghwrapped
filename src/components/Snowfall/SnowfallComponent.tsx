'use client';

import React, { useEffect, useRef } from 'react';
import Script from 'next/script';
import './snowfall.css';

interface SnowfallProps {
  isActive?: boolean;
}

declare global {
  interface Window {
    snowStorm: any;
  }
}

const SnowfallComponent: React.FC<SnowfallProps> = ({ isActive = true }) => {
  const snowfallRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive) {
      // Stop the snowfall if not active
      if (window.snowStorm && typeof window.snowStorm.stop === 'function') {
        window.snowStorm.stop();
      }
      return;
    }

    // Wait for the script to load before initializing
    const initializeSnowstorm = () => {
      if (window.snowStorm && isActive) {
        // Define festive characters for variety
        const festiveChars = ['❄', '❅', '❆', '✦', '✧'];

        // Configure snowstorm options
        window.snowStorm.flakesMax = 100; // Adjust number of snowflakes
        window.snowStorm.flakesMaxActive = 50; // Limit active flakes for performance
        window.snowStorm.flakeBottom = null; // Full screen snowfall
        window.snowStorm.snowColor = '#fff'; // Snow color
        window.snowStorm.snowCharacter = '❄'; // Default snowflake character
        window.snowStorm.flakeWidth = 14; // Width of snowflake
        window.snowStorm.flakeHeight = 14; // Height of snowflake
        window.snowStorm.vMaxX = 2; // Horizontal speed
        window.snowStorm.vMaxY = 2; // Vertical speed
        window.snowStorm.zIndex = 1000000; // Ensure it appears on top of everything
        window.snowStorm.useTwinkleEffect = true; // Add twinkling effect
        window.snowStorm.useMeltEffect = true; // Add melting effect
        window.snowStorm.className = 'christmas-snowflake'; // Apply custom class for styling

        // Override the SnowFlake creation to use random festive characters
        const originalSnowFlakeConstructor = window.snowStorm.SnowFlake;
        window.snowStorm.SnowFlake = function(type: number, x: number, y: number) {
          const flake = new originalSnowFlakeConstructor(type, x, y);

          // Randomly assign different festive characters
          if (Math.random() > 0.7) { // Only change character for some flakes to maintain performance
            const randomChar = festiveChars[Math.floor(Math.random() * festiveChars.length)];
            flake.o.innerHTML = randomChar;
          }

          return flake;
        };

        // Start the snowfall
        window.snowStorm.targetElement = document.body; // Target the whole body
        window.snowStorm.start();
      }
    };

    // Check if snowStorm is already loaded
    if (window.snowStorm) {
      initializeSnowstorm();
    } else {
      // Wait for the script to load
      const scriptTimer = setInterval(() => {
        if (window.snowStorm) {
          clearInterval(scriptTimer);
          initializeSnowstorm();
        }
      }, 100);

      // Clear interval after 10 seconds to prevent infinite loop
      setTimeout(() => clearInterval(scriptTimer), 10000);
    }

    // Cleanup function
    return () => {
      if (window.snowStorm && typeof window.snowStorm.stop === 'function') {
        window.snowStorm.stop();
      }
    };
  }, [isActive]);

  if (!isActive) {
    return null;
  }

  return (
    <>
      <Script
        src="/snowfall.js"
        strategy="afterInteractive"
        onLoad={() => {
          // Initialize snowstorm if component is active and script loads after mount
          if (isActive && window.snowStorm) {
            window.snowStorm.targetElement = document.body;
            window.snowStorm.start();
          }
        }}
      />
      {/* Snowfall elements will be added dynamically by the script */}
    </>
  );
};

export default SnowfallComponent;