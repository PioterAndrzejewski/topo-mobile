import { useQuery } from '@tanstack/react-query';
import { getRock } from 'src/services/rocks';

export const useRock = (id: string) => {
  return useQuery({
    queryFn: () => getRock(id),
    queryKey: ['rock', id],
    refetchInterval: 1000 * 60 * 60 * 24,
  });
};
