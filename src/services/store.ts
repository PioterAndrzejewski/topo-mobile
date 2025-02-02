import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import { QueryClientSingleton } from "src/helpers/QueryClient";
import navigate from "src/navigators/navigationRef";

import type { UserLoginData } from "src/services/auth";
import { queryKeys } from "./queryKeys";

export async function saveToSecureStorage(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getFromSecureStorage(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) return result;
  else return null;
}

export async function saveJWT(value: string) {
  await SecureStore.setItemAsync("jwt", value);
}

export async function saveRefreshToken(value: string) {
  await SecureStore.setItemAsync("refreshToken", value);
}

export const setUserToStorage = async (user: UserLoginData) => {
  try {
    await AsyncStorage.setItem("userEmail", user.email);
    await AsyncStorage.setItem("userName", user.username);
  } catch (err) {
    return null;
  }
};

export const logout = async () => {
  const queryClient = QueryClientSingleton.getInstance();
  try {
    await SecureStore.deleteItemAsync("refreshToken");
    await SecureStore.deleteItemAsync("jwt");
    await SecureStore.deleteItemAsync("userEmail");
    await SecureStore.deleteItemAsync("userName");
    queryClient.invalidateQueries({
      queryKey: queryKeys.profile.me,
    });
    queryClient.removeQueries({
      queryKey: queryKeys.profile.me,
    });
    await navigate("Login");
  } catch (err) {
    console.log("something went wrong during logout");
  }
};
