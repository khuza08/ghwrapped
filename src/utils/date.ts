import { format, parseISO, subYears } from 'date-fns';

/**
 * Get date range for "last year" (365 days ago to now)
 */
export const getLastYearRange = (): { start: Date; end: Date } => {
  const now = new Date();
  const start = subYears(now, 1);
  return { start, end: now };
};

/**
 * Format date to YYYY-MM-DD string
 */
export const formatDate = (date: Date): string => {
  return format(date, 'yyyy-MM-dd');
};

/**
 * Format date to readable string
 */
export const formatReadableDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMMM d, yyyy');
};

/**
 * Get hour from ISO date string (0-23)
 */
export const getHourFromISOString = (isoString: string): number => {
  return new Date(isoString).getUTCHours();
};

/**
 * Get day of week from ISO date string (0-6, Sunday-Saturday)
 */
export const getDayOfWeekFromISOString = (isoString: string): number => {
  return new Date(isoString).getUTCDay();
};

/**
 * Calculate commit streaks from date -> count mapping
 */
export const calculateStreaks = (commitsByDate: Record<string, number>): { start: string; end: string; length: number } | null => {
  if (Object.keys(commitsByDate).length === 0) return null;

  // Convert date strings to actual dates and sort them
  const sortedDates = Object.keys(commitsByDate)
    .map(dateStr => ({ date: new Date(dateStr), commits: commitsByDate[dateStr] }))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  if (sortedDates.length === 0) return null;

  let currentStreakStart: Date | null = null;
  let currentStreakEnd: Date | null = null;
  let currentStreakLength = 0;

  let maxStreakStart: Date | null = null;
  let maxStreakEnd: Date | null = null;
  let maxStreakLength = 0;

  for (let i = 0; i < sortedDates.length; i++) {
    const currentDate = sortedDates[i].date;
    
    // Check if it's the first date or if it's consecutive to the previous one
    if (i === 0 || isNextDay(sortedDates[i - 1].date, currentDate)) {
      if (currentStreakStart === null) {
        currentStreakStart = currentDate;
      }
      currentStreakEnd = currentDate;
      currentStreakLength++;
    } else {
      // Streak was broken, check if current streak is the longest
      if (currentStreakLength > maxStreakLength) {
        maxStreakStart = currentStreakStart;
        maxStreakEnd = currentStreakEnd;
        maxStreakLength = currentStreakLength;
      }
      
      // Start new streak
      currentStreakStart = currentDate;
      currentStreakEnd = currentDate;
      currentStreakLength = 1;
    }
  }

  // Check the last streak
  if (currentStreakLength > maxStreakLength) {
    maxStreakStart = currentStreakStart;
    maxStreakEnd = currentStreakEnd;
    maxStreakLength = currentStreakLength;
  }

  if (maxStreakStart && maxStreakEnd) {
    return {
      start: formatDate(maxStreakStart),
      end: formatDate(maxStreakEnd),
      length: maxStreakLength
    };
  }

  return null;
};

/**
 * Check if date2 is exactly one day after date1
 */
const isNextDay = (date1: Date, date2: Date): boolean => {
  const nextDay = new Date(date1);
  nextDay.setDate(nextDay.getDate() + 1);
  return date2.toDateString() === nextDay.toDateString();
};

/**
 * Get most active hour from ISO date strings
 */
export const getMostActiveHour = (dateStrings: string[]): { hour: number; count: number } | null => {
  if (dateStrings.length === 0) return null;

  const hourCount: Record<number, number> = {};
  
  for (const dateStr of dateStrings) {
    const hour = getHourFromISOString(dateStr);
    hourCount[hour] = (hourCount[hour] || 0) + 1;
  }

  let maxHour: number | null = null;
  let maxCount = 0;

  for (const [hour, count] of Object.entries(hourCount)) {
    const hourNum = parseInt(hour, 10);
    if (count > maxCount) {
      maxCount = count;
      maxHour = hourNum;
    }
  }

  return maxHour !== null ? { hour: maxHour, count: maxCount } : null;
};

/**
 * Determine developer schedule type based on preferred hours
 */
export const getDeveloperScheduleType = (mostActiveHour: number | null): 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime' => {
  if (mostActiveHour === null) return 'anytime';

  if (mostActiveHour >= 5 && mostActiveHour < 12) {
    return 'morning';
  } else if (mostActiveHour >= 12 && mostActiveHour < 17) {
    return 'afternoon';
  } else if (mostActiveHour >= 17 && mostActiveHour < 22) {
    return 'evening';
  } else {
    return 'night';
  }
};

/**
 * Determine activity type based on commit distribution
 */
export const getActivityType = (commitsByDate: Record<string, number>): 'consistent' | 'weekend-warrior' | 'burst-coder' | 'steady-pace' => {
  const dates = Object.keys(commitsByDate);
  if (dates.length === 0) return 'steady-pace';

  // Calculate days with commits vs total days
  const commitDates = dates.filter(date => commitsByDate[date] > 0);
  const totalDays = Math.max(1, dates.length);
  const activeDaysRatio = commitDates.length / totalDays;

  // Count weekend vs weekday commits
  let weekendCommits = 0;
  let weekdayCommits = 0;

  for (const [date, count] of Object.entries(commitsByDate)) {
    const dayOfWeek = new Date(date).getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) { // Sunday or Saturday
      weekendCommits += count;
    } else {
      weekdayCommits += count;
    }
  }

  const weekendRatio = weekendCommits / (weekendCommits + weekdayCommits);

  // Determine type based on heuristics
  if (weekendRatio > 0.4) {
    return 'weekend-warrior';
  } else if (activeDaysRatio > 0.7) {
    return 'consistent';
  } else if (activeDaysRatio < 0.2) {
    return 'burst-coder';
  } else {
    return 'steady-pace';
  }
};