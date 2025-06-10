import { useEffect, useState } from 'react';
import { getUsers, type User } from '../services/userService';

interface UseUserResult {
  data: User[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export const useDefaultUsers = (count?: number): UseUserResult => {
  const [data, setData] = useState<User[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [shouldFetch, setShouldFetch] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const users = await getUsers(count);
        if (!isCancelled) {
          setData(users);
          setIsLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [shouldFetch, count]);

  const refetch = () => {
    setShouldFetch(prev => prev + 1);
  };

  return {
    data,
    isLoading,
    error,
    refetch,
  };
};
