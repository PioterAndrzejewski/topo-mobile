import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from 'src/services/profile';

export const useUserProfile = () => {
  return useQuery({
    queryFn: getUserProfile,
    queryKey: ['user-profile'],
  });
};
