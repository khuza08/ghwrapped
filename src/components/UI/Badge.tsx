import React from "react";

interface BadgeProps {
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <span className="px-2 py-1 md:px-3 md:py-1.5 bg-white/5 border border-white/20 text-white/80 rounded-full text-xs md:text-sm lg:text-base font-medium">
      {text}
    </span>
  );
};

export default Badge;
