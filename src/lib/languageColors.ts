import languageColors from './languageColors.json';

// Function to get language color map from linguist data
export const getLanguageColorMap = (): Record<string, string> => {
  return languageColors;
};

// Function to get specific language color
export const getLanguageColor = (language: string): string => {
  return languageColors[language] || '#888888'; // Default gray if language not found
};