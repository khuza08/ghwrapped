import { useState, useEffect } from 'react';
import { GitHubWrappedData } from '@/lib/types';
import { handleApiError, AppError } from '@/lib/errors';

// Cache duration: 1 hour (3600000 ms)
const CACHE_DURATION = 3600000;

export const fetchWrappedData = async (username: string): Promise<GitHubWrappedData> => {
  const response = await fetch(`/api/github/${username}`);

  if (!response.ok) {
    const errorData = await response.json();
    // Create an AppError from the server response
    throw new AppError(errorData.message || 'Failed to fetch GitHub Wrapped data', response.status);
  }

  return response.json();
};

// Function to get cached data
const getCachedWrappedData = (username: string): GitHubWrappedData | null => {
  if (typeof window === 'undefined') return null;

  const cacheKey = `github-wrapped-data-${username.toLowerCase()}`;
  const cached = localStorage.getItem(cacheKey);

  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    // Check if cache is still valid (not expired)
    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed.data;
    } else {
      // Remove expired cache
      localStorage.removeItem(cacheKey);
      return null;
    }
  } catch (error) {
    console.error('Error parsing cached data:', error);
    return null;
  }
};

// Function to set cached data
const setCachedWrappedData = (username: string, data: GitHubWrappedData) => {
  if (typeof window === 'undefined') return;

  const cacheKey = `github-wrapped-data-${username.toLowerCase()}`;
  const cacheData = {
    data,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));

    // Also update the quick verification cache
    setCachedVerification(username, true);
  } catch (error) {
    console.error('Error caching data:', error);
    // If localStorage is full, try to clear some old entries
    try {
      const allKeys = Object.keys(localStorage);
      for (const key of allKeys) {
        if (key.startsWith('github-wrapped-data-')) {
          const item = localStorage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            if (Date.now() - parsed.timestamp > CACHE_DURATION) {
              localStorage.removeItem(key);
            }
          }
        }
      }
      // Try again after clearing expired entries
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      // Also update the quick verification cache
      setCachedVerification(username, true);
    } catch (clearError) {
      console.error('Unable to cache data even after cleanup:', clearError);
    }
  }
};

// Function to get cached verification status
const getCachedVerification = (username: string): boolean | null => {
  if (typeof window === 'undefined') return null;

  const cacheKey = `github-wrapped-verification-${username.toLowerCase()}`;
  const cached = localStorage.getItem(cacheKey);

  if (!cached) return null;

  try {
    const parsed = JSON.parse(cached);
    // Check if cache is still valid (not expired - using same duration)
    if (Date.now() - parsed.timestamp < CACHE_DURATION) {
      return parsed.exists;
    } else {
      // Remove expired cache
      localStorage.removeItem(cacheKey);
      return null;
    }
  } catch (error) {
    console.error('Error parsing cached verification:', error);
    return null;
  }
};

// Function to set cached verification status
const setCachedVerification = (username: string, exists: boolean) => {
  if (typeof window === 'undefined') return;

  const cacheKey = `github-wrapped-verification-${username.toLowerCase()}`;
  const cacheData = {
    exists,
    timestamp: Date.now(),
  };

  try {
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error caching verification:', error);
    // If localStorage is full, try to clear some old entries
    try {
      const allKeys = Object.keys(localStorage);
      for (const key of allKeys) {
        if (key.startsWith('github-wrapped-verification-')) {
          const item = localStorage.getItem(key);
          if (item) {
            const parsed = JSON.parse(item);
            if (Date.now() - parsed.timestamp > CACHE_DURATION) {
              localStorage.removeItem(key);
            }
          }
        }
      }
      // Try again after clearing expired entries
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    } catch (clearError) {
      console.error('Unable to cache verification even after cleanup:', clearError);
    }
  }
};

export const useWrappedData = (username: string) => {
  const [data, setData] = useState<GitHubWrappedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  useEffect(() => {
    if (!username) return;

    const loadWrappedData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to get from cache first
        const cachedData = getCachedWrappedData(username);
        if (cachedData) {
          setData(cachedData);
          setLoading(false);
          return;
        }

        // If not in cache, fetch from API
        const wrappedData = await fetchWrappedData(username);
        setData(wrappedData);

        // Cache the data for future use
        setCachedWrappedData(username, wrappedData);
      } catch (err: any) {
        // Handle errors with our error service
        const appError = handleApiError(err);
        setError(appError);
      } finally {
        setLoading(false);
      }
    };

    loadWrappedData();
  }, [username]);

  return { data, loading, error };
};