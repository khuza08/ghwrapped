import React from 'react';

interface AchievementProps {
  title: string;
  description: string;
  icon?: string;
  imageUrl?: string;
  earnedDate?: string;
  className?: string;
}

const Achievement: React.FC<AchievementProps> = ({
  title,
  description,
  icon = '🏆',
  imageUrl,
  earnedDate,
  className = ''
}) => {
  return (
    <div className={`bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-white/20 rounded-xl p-4 md:p-5 w-48 flex flex-col items-center text-center backdrop-blur-sm ${className}`}>
      {imageUrl ? (
        <div className="mb-2">
          <img
            src={imageUrl}
            alt={title}
            className="w-12 h-12 md:w-16 md:h-16 object-contain"
            onError={(e) => {
              // Fallback to emoji if image fails to load
              const target = e.target as HTMLImageElement;
              target.onerror = null; // Prevent infinite loop
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const emojiDiv = document.createElement('div');
                emojiDiv.className = 'text-3xl md:text-4xl';
                emojiDiv.textContent = icon;
                parent.appendChild(emojiDiv);
              }
            }}
          />
        </div>
      ) : (
        <div className="text-3xl md:text-4xl mb-2">{icon}</div>
      )}
      <h5 className="font-bold text-white text-sm md:text-base mb-1 truncate w-full">{title}</h5>
      <p className="text-xs md:text-sm text-white/70 mb-2">{description}</p>
      {earnedDate && (
        <p className="text-xs text-white/50">{earnedDate}</p>
      )}
    </div>
  );
};

export default Achievement;