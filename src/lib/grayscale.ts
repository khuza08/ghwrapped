// Grayscale utility functions for monochromatic theme

// Get a specific shade of gray based on index
export const getGrayColor = (index: number): string => {
  // Creating a range of grays from dark to light
  const grays = [
    '#111111', // Very dark gray
    '#222222',
    '#333333',
    '#444444',
    '#555555',
    '#666666',
    '#777777',
    '#888888',
    '#999999',
    '#AAAAAA',
    '#BBBBBB',
    '#CCCCCC',
    '#DDDDDD',
    '#EEEEEE',
    '#F0F0F0'  // Light gray
  ];

  return grays[index % grays.length];
};

// Get a more subtle variation of gray
export const getSubtleGrayColor = (index: number): string => {
  // More subtle variations for backgrounds and secondary elements
  const subtleGrays = [
    '#232323',
    '#323232',
    '#414141',
    '#505050',
    '#595959',
    '#626262',
    '#6B6B6B',
    '#747474',
    '#7D7D7D',
    '#868686',
    '#8F8F8F',
    '#989898',
    '#A1A1A1',
    '#AAAAAA',
    '#B3B3B3',
    '#BCBCBC',
    '#C5C5C5',
    '#CECECE',
    '#D7D7D7',
    '#E0E0E0',
    '#E9E9E9',
    '#F2F2F2' // Very light gray
  ];

  return subtleGrays[index % subtleGrays.length];
};

// Get a gray based on percentage for gradients
export const getPercentGray = (percent: number): string => {
  // Convert percentage (0-100) to a gray value (0-255)
  const grayValue = Math.round(200 - (percent * 1.5)); // From #C8C8C8 (~light) to #080808 (dark)
  const hexValue = grayValue.toString(16).padStart(2, '0');
  return `#${hexValue}${hexValue}${hexValue}`;
};