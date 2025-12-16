import { useState, useEffect } from 'react';
import { GitHubWrappedData } from '@/lib/types';
import { handleApiError, AppError } from '@/lib/errors';

export const fetchWrappedData = async (username: string): Promise<GitHubWrappedData> => {
  const response = await fetch(`/api/github/${username}`);

  if (!response.ok) {
    const errorData = await response.json();
    // Create an AppError from the server response
    throw new AppError(errorData.message || 'Failed to fetch GitHub Wrapped data', response.status);
  }

  return response.json();
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
        const wrappedData = await fetchWrappedData(username);
        setData(wrappedData);
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