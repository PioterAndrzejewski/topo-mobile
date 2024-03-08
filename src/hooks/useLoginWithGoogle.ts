import { useMutation } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { useAtom } from "jotai";
import { useCallback } from "react";
import Toast from "react-native-toast-message";

import navigate from "src/navigators/navigationRef";
import { loginGoogle } from "src/services/auth";
import {
  saveJWT,
  saveRefreshToken,
  setUserToStorage,
} from "src/services/store";
import { providerUsedAtom } from "src/store/global";

export const useLoginWithGoogle = () => {
  const [providerUsed, setProviderUsed] = useAtom(providerUsedAtom);
  const url = Linking.useURL();
  const { mutate: loginWithGoogle, isPending } = useMutation({
    mutationKey: ["loginGoogle", url],
    mutationFn: (params: string) => loginGoogle(params),
    onError: async (data) => {
      Toast.show({
        type: "error",
        text2: "Coś poszło nie tak podczas logowania",
      });
    },
    onSuccess: async (data) => {
      await saveJWT(data.jwt);
      await saveRefreshToken(data.refreshToken);
      await setUserToStorage(data.user);
      navigate("HomeNavigator");
    },
    retryDelay: 5000,
    retry: 3,
  });

  const sendRequest = useCallback(async () => {
    if (!url || !url.includes("wspinapp://") || !url.includes("access_token")) {
      return;
    }
    const param = url?.replace("wspinapp://?", "");
    setProviderUsed(true);
    await loginWithGoogle(param);
  }, [url]);

  if (!providerUsed && url) {
    sendRequest();
  }
  return isPending;
};
