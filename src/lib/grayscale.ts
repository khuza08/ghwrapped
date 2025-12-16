// Grayscale utility functions for monochromatic dark theme

// Get a specific shade of dark gray based on index
export const getDarkGrayColor = (index: number): string => {
  // Creating a range of dark grays for dark theme
  const darkGrays = [
    '#0a0a0a', // Nearly black
    '#111111',
    '#1a1a1a',
    '#222222',
    '#2d2d2d',
    '#3a3a3a',
    '#474747',
    '#545454',
    '#616161',
    '#6e6e6e',
    '#7b7b7b',
    '#888888',
    '#959595',
    '#a2a2a2',
    '#afafaf'  // Lighter gray for contrast
  ];

  return darkGrays[index % darkGrays.length];
};

// Get a more subtle variation of dark gray
export const getSubtleDarkGrayColor = (index: number): string => {
  // More subtle variations for backgrounds and secondary elements in dark theme
  const subtleDarkGrays = [
    '#141414',
    '#1f1f1f',
    '#2a2a2a',
    '#353535',
    '#404040',
    '#4b4b4b',
    '#565656',
    '#616161',
    '#6c6c6c',
    '#777777',
    '#828282',
    '#8d8d8d',
    '#989898',
    '#a3a3a3',
    '#aeaeae',
    '#b9b9b9' // Lighter for contrast
  ];

  return subtleDarkGrays[index % subtleDarkGrays.length];
};

// Get a gray based on percentage for gradients in dark theme
export const getPercentDarkGray = (percent: number): string => {
  // Convert percentage (0-100) to a gray value (0-255) suitable for dark theme
  const grayValue = Math.round(15 + (percent * 1.8)); // From nearly black (#0f0f0f) to lightish gray
  const hexValue = grayValue.toString(16).padStart(2, '0');
  return `#${hexValue}${hexValue}${hexValue}`;
};

// Alternative functions with different naming convention for compatibility
export const getGrayColor = getDarkGrayColor;
export const getSubtleGrayColor = getSubtleDarkGrayColor;