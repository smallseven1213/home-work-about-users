import useSWR from 'swr';
import { getUsers, type User } from '../services/userService';

interface UseUserResult {
  data: User[] | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

const USERS_KEY = 'users';

export const useSWRUsers = (count?: number): UseUserResult => {
  const fetcher = () => getUsers(count);
  const key = count ? `${USERS_KEY}-${count}` : USERS_KEY;

  const { data, error, isLoading, mutate } = useSWR(key, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000,
    errorRetryCount: 3,
    errorRetryInterval: 1000,
  });

  const refetch = () => {
    mutate();
  };

  return {
    data: data || null,
    isLoading,
    error: error || null,
    refetch,
  };
};
