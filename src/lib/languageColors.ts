import languageColors from './languageColors.json';

// Type the languageColors import properly
const typedLanguageColors: { [key: string]: string } = languageColors;

// Function to get language color map from linguist data
export const getLanguageColorMap = (): Record<string, string> => {
  return typedLanguageColors;
};

// Function to get specific language color
export const getLanguageColor = (language: string): string => {
  return typedLanguageColors[language] || '#888888'; // Default gray if language not found
};