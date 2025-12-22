/**
 * Checks if the current date falls within the Christmas season
 * Christmas season is defined as December 15 to January 5
 * @returns boolean indicating if it's Christmas season
 */
export const isChristmasSeason = (): boolean => {
  const today = new Date();
  const month = today.getMonth(); // 0-11 (January is 0)
  const day = today.getDate();

  // If it's December (month 11)
  if (month === 11) {
    // Check if day is between 15-31
    return day >= 15;
  }
  
  // If it's January (month 0)
  if (month === 0) {
    // Check if day is between 1-5
    return day <= 5;
  }

  // Any other month is not Christmas season
  return false;
};