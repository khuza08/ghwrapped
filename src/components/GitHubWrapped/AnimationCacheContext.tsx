import React, { createContext, useContext, useState } from 'react';

export interface AnimationCache {
  [slideId: string]: boolean;
}

interface AnimationCacheContextType {
  animationCache: AnimationCache;
  setAnimationCompleted: (slideId: string) => void;
}

const AnimationCacheContext = createContext<AnimationCacheContextType | undefined>(undefined);

export const AnimationCacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [animationCache, setAnimationCache] = useState<AnimationCache>({});

  const setAnimationCompleted = (slideId: string) => {
    setAnimationCache(prev => ({
      ...prev,
      [slideId]: true
    }));
  };

  return (
    <AnimationCacheContext.Provider value={{ animationCache, setAnimationCompleted }}>
      {children}
    </AnimationCacheContext.Provider>
  );
};

export const useAnimationCache = () => {
  const context = useContext(AnimationCacheContext);
  if (!context) {
    throw new Error('useAnimationCache must be used within an AnimationCacheProvider');
  }
  return context;
};