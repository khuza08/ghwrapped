import React from "react";

interface PersonalityCardProps {
  emoji: string;
  title: string;
  description: string;
}

const PersonalityCard: React.FC<PersonalityCardProps> = ({
  emoji,
  title,
  description,
}) => {
  return (
    <div className="bg-white/5 border border-white/20 p-3 md:p-4 lg:p-6 rounded-xl">
      <div className="text-2xl md:text-3xl lg:text-4xl mb-1 md:mb-2 text-white/80">
        {emoji}
      </div>
      <h4 className="text-base md:text-lg lg:text-xl font-bold text-white/80">
        {title}
      </h4>
      <p className="text-xs md:text-sm lg:text-base text-white/50 mt-1">
        {description}
      </p>
    </div>
  );
};

export default PersonalityCard;
