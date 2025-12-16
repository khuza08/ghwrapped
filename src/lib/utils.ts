/**
 * Sleep function to introduce delays (useful for rate limiting)
 */
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Debounce function to limit function calls
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function to limit function calls
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let shouldWait = false;
  return (...args: Parameters<T>) => {
    if (!shouldWait) {
      func(...args);
      shouldWait = true;
      setTimeout(() => {
        shouldWait = false;
      }, delay);
    }
  };
};

/**
 * Capitalize first letter of a string
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Format large numbers with abbreviations
 */
export const formatNumber = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Normalize GitHub username (remove leading/trailing whitespace and convert to lowercase)
 */
export const normalizeUsername = (username: string): string => {
  return username.trim().toLowerCase();
};

/**
 * Validate GitHub username format
 */
export const isValidUsername = (username: string): boolean => {
  // GitHub usernames can contain alphanumeric characters and hyphens, 
  // but cannot start or end with a hyphen, and must be 1-39 characters long
  const usernameRegex = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
  return usernameRegex.test(username);
};

/**
 * Extract date from GitHub commit timestamp
 */
export const extractDateFromTimestamp = (timestamp: string): string => {
  return timestamp.split('T')[0];
};

/**
 * Group an array of items by a key function
 */
export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  keyFunction: (item: T) => K
): Record<K, T[]> => {
  return array.reduce((result, item) => {
    const key = keyFunction(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
    return result;
  }, {} as Record<K, T[]>);
};

/**
 * Get the top N items from an object based on values
 */
export const getTopN = <T>(
  obj: Record<string, T>,
  n: number,
  compareFn?: (a: [string, T], b: [string, T]) => number
): [string, T][] => {
  const entries = Object.entries(obj);
  const sorted = compareFn 
    ? entries.sort(compareFn) 
    : entries.sort((a, b) => (a[1] as any) > (b[1] as any) ? -1 : 1);
  return sorted.slice(0, n);
};