import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BackgroundContextType {
  background: string;
  setBackground: (background: string) => void;
  isBackgroundSelectorOpen: boolean;
  toggleBackgroundSelector: () => void;
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined);

export const BackgroundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [background, setBackground] = useState<string>('none');
  const [isBackgroundSelectorOpen, setIsBackgroundSelectorOpen] = useState<boolean>(false);

  const toggleBackgroundSelector = () => {
    setIsBackgroundSelectorOpen(!isBackgroundSelectorOpen);
  };

  return (
    <BackgroundContext.Provider value={{ 
      background, 
      setBackground, 
      isBackgroundSelectorOpen,
      toggleBackgroundSelector
    }}>
      {children}
    </BackgroundContext.Provider>
  );
};

export const useBackground = () => {
  const context = useContext(BackgroundContext);
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
};