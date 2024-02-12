import { useMutation } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import Toast from "react-native-toast-message";

import { useCallback, useState } from "react";
import navigate from "src/navigators/navigationRef";
import { loginGoogle } from "src/services/auth";
import {
  saveJWT,
  saveRefreshToken,
  setUserToStorage,
} from "src/services/store";

export const useLoginWithGoogle = () => {
  const [requestSent, setRequestSent] = useState(false);
  const url = Linking.useURL();
  const { mutate: loginWithGoogle } = useMutation({
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
    if (!url) return;
    const param = url?.replace("wspinapp://?", "");
    setRequestSent(true);
    await loginWithGoogle(param);
  }, [url]);

  if (!requestSent && url) {
    sendRequest();
  }
};
