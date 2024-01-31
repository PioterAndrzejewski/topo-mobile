import dayjs from "dayjs";
import { useMemo } from "react";

import { useUserProfile } from "./useUserProfile";

export const useUserSubscription = () => {
  const { data } = useUserProfile();

  const currentDate = useMemo(() => dayjs(), []);
  const subscriptionToDate = useMemo(() => {
    if (!data || !data.subscriptionTo) return null;
    return dayjs(Number(data.subscriptionTo));
  }, [data]);

  if (!subscriptionToDate) return false;
  return currentDate.isBefore(subscriptionToDate);
};
