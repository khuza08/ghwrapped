import React from "react";

interface MobileWarningProps {
  deviceName?: string;
}

const MobileWarning: React.FC<MobileWarningProps> = ({
  deviceName = "Mobile Device",
}) => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="text-center max-w-md w-full">
        <div className="text-6xl mb-6">📱</div>
        <h1 className="text-2xl font-bold text-white mb-4">
          Sorry, Mobile Not Supported
        </h1>
        <p className="text-white/50 mb-6">
          This application has complex layouts that work best on desktop. Please
          access this site on a desktop computer for the best experience.
        </p>
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg p-4">
          <p className="text-sm text-white/80">Detected: {deviceName}</p>
        </div>
      </div>
    </div>
  );
};

export default MobileWarning;
