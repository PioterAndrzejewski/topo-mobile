import { useQuery } from "@tanstack/react-query";
import { getUserProfile } from "src/services/profile";
import { queryKeys } from "src/services/queryKeys";

export const useUserProfile = () => {
  return useQuery({
    queryFn: getUserProfile,
    queryKey: queryKeys.profile.me,
  });
};
