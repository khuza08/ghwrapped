import React, { useState, useRef, ChangeEvent } from "react";
import { useBackground } from "./BackgroundContext";

interface BackgroundSelectorProps {
  onClose: () => void;
}

const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ onClose }) => {
  const { setBackground } = useBackground();
  const [selectedBackground, setSelectedBackground] = useState<string>("none");
  const [customImage, setCustomImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultBackgrounds = [
    { id: "none", label: "None", color: "#111111" },
    { id: "dark", label: "Dark", color: "#1a1a1a" },
    {
      id: "gradient1",
      label: "Purple Gradient",
      color: "linear-gradient(45deg, #1e3c72, #2a5298)",
    },
    {
      id: "gradient2",
      label: "Blue Gradient",
      color: "linear-gradient(45deg, #2193b0, #6dd5ed)",
    },
    {
      id: "gradient3",
      label: "Sunset",
      color: "linear-gradient(45deg, #ff5e62, #ff9966)",
    },
    {
      id: "gradient4",
      label: "Forest",
      color: "linear-gradient(45deg, #56ab2f, #a8e063)",
    },
  ];

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imageData = event.target.result as string;
          setCustomImage(imageData);
          setSelectedBackground("custom");
          setBackground(imageData);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundSelect = (backgroundId: string, color?: string) => {
    setSelectedBackground(backgroundId);

    if (backgroundId === "none") {
      setBackground("none");
    } else if (backgroundId === "custom" && customImage) {
      setBackground(customImage);
    } else if (color) {
      setBackground(color);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white/5 backdrop-blur-xl border-l border-white/20 z-50 p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-lg">Background</h3>
        <button onClick={onClose} className="text-white/70 hover:text-white">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <h4 className="text-white/80 text-sm mb-2">Default Backgrounds</h4>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {defaultBackgrounds.map((bg) => (
            <button
              key={bg.id}
              className={`p-2 rounded-lg border-2 ${
                selectedBackground === bg.id
                  ? "border-white"
                  : "border-white/20"
              }`}
              style={{
                background: bg.color,
              }}
              onClick={() => handleBackgroundSelect(bg.id, bg.color)}
            >
              <span className="text-xs text-white/80">{bg.label}</span>
            </button>
          ))}
        </div>

        <h4 className="text-white/80 text-sm mb-2">Custom Image</h4>
        <div className="mb-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={handleFileInputClick}
            className="w-full py-2 px-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white/80 text-sm transition-colors"
          >
            Upload Image
          </button>
        </div>

        {customImage && (
          <div className="mb-4">
            <h4 className="text-white/80 text-sm mb-2">Your Image</h4>
            <button
              className={`w-full h-20 rounded-lg border-2 ${
                selectedBackground === "custom"
                  ? "border-white"
                  : "border-white/20"
              } overflow-hidden`}
              style={{
                backgroundImage: `url(${customImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleBackgroundSelect("custom")}
            >
              {selectedBackground === "custom" && (
                <div className="bg-black/30 w-full h-full flex items-center justify-center">
                  <span className="text-white text-xs">Selected</span>
                </div>
              )}
            </button>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <button
          onClick={() => {
            setCustomImage(null);
            setSelectedBackground("none");
            setBackground("none");
          }}
          className="w-full py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 text-sm transition-colors"
        >
          Reset Background
        </button>
      </div>
    </div>
  );
};

export default BackgroundSelector;
