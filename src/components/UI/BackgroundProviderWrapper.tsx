'use client';

import React, { ReactNode } from 'react';
import { BackgroundProvider } from '@/components/UI/BackgroundContext';

interface BackgroundProviderWrapperProps {
  children: ReactNode;
}

const BackgroundProviderWrapper: React.FC<BackgroundProviderWrapperProps> = ({ children }) => {
  return (
    <BackgroundProvider>
      {children}
    </BackgroundProvider>
  );
};

export default BackgroundProviderWrapper;