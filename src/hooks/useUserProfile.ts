import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { getUserProfile } from "src/services/profile";
import { queryKeys } from "src/services/queryKeys";
import { wantsToUseNotLoggedAtom } from "src/store/global";

export const useUserProfile = () => {
  const wantsToUseNotLogged = useAtomValue(wantsToUseNotLoggedAtom);
  return useQuery({
    queryFn: getUserProfile,
    queryKey: queryKeys.profile.me,
    enabled: !wantsToUseNotLogged,
    staleTime: 1000 * 60 * 10,
  });
};
