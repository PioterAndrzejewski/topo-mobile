import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";

import { logout } from "src/services/store";
import { wantsToUseNotLoggedAtom } from "src/store/global";

export const useLogout = () => {
  const setUserWantsToUseNotLogged = useSetAtom(wantsToUseNotLoggedAtom);
  const navigation = useNavigation();

  const logoutFunction = () => {
    logout();
    setUserWantsToUseNotLogged(false);
  };

  return logoutFunction;
};
