import { useState, useEffect } from 'react';

interface MobileDetectionResult {
  isMobile: boolean;
  deviceName: string;
}

const getDeviceName = (): string => {
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

  // Try to extract specific device model from user agent
  const deviceMatches = userAgent.match(/\(([^)]+)\)/g);

  if (deviceMatches) {
    for (const match of deviceMatches) {
      // Look for specific device names
      if (/redmi/i.test(match)) {
        const redmiModel = match.match(/redmi\s*([0-9a-z]+)/i);
        if (redmiModel) return `Redmi ${redmiModel[1]}`;
      }
      if (/xiaomi/i.test(match)) {
        const xiaomiModel = match.match(/xiaomi\s*([0-9a-z]+)/i);
        if (xiaomiModel) return `Xiaomi ${xiaomiModel[1]}`;
      }
      if (/iphone/i.test(match)) {
        const iphoneModel = match.match(/iphone\s*([0-9,]+)/i);
        if (iphoneModel) return `iPhone ${iphoneModel[1].replace(',', ',')}`;
      }
      if (/samsung/i.test(match)) {
        const samsungModel = match.match(/sm-([a-z0-9]+)/i);
        if (samsungModel) return `Samsung SM-${samsungModel[1]}`;
      }
      if (/pixel/i.test(match)) {
        const pixelModel = match.match(/pixel\s*([0-9]+)/i);
        if (pixelModel) return `Google Pixel ${pixelModel[1]}`;
      }
    }
  }

  // Check for specific device types
  if (/android/i.test(userAgent)) {
    return 'Android Device';
  }

  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    // Check for iPad specifically (iPadOS reports as Mac sometimes)
    if (navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform)) {
      return 'iPad';
    }
    return 'iOS Device';
  }

  // Check for mobile/tablet using screen size and touch capabilities
  if (window.innerWidth <= 768 || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2)) {
    return 'Mobile Device';
  }

  return 'Desktop';
};

const useMobileDetection = (): MobileDetectionResult => {
  const [detectionResult, setDetectionResult] = useState<MobileDetectionResult>({
    isMobile: false,
    deviceName: 'Desktop'
  });

  useEffect(() => {
    const checkDevice = () => {
      const deviceName = getDeviceName();
      const isMobile = window.innerWidth < 768; // Using Tailwind's md breakpoint

      return { isMobile, deviceName };
    };

    // Run on initial render
    setDetectionResult(checkDevice());

    // Add event listener for window resize
    const handleResize = () => {
      setDetectionResult(checkDevice());
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return detectionResult;
};

export default useMobileDetection;