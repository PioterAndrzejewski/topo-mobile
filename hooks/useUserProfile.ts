import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../services/profile';

export const useUserProfile = () => {
  return useQuery({
    queryFn: getUserProfile,
    queryKey: ['user-profile'],
  });
};
