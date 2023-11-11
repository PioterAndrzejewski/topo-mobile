import { useQuery } from '@tanstack/react-query';
import { getRock } from '../services/rocks';

export const useRock = (id: string) => {
  return useQuery({
    queryFn: () => getRock(id),
    queryKey: ['areas'],
    refetchInterval: 1000 * 60 * 60 * 24,
    cacheTime: Infinity,
  });
};
