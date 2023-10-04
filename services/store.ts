import * as SecureStore from 'expo-secure-store';
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { UserLoginData } from './auth';

export async function saveToSecureStorage(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function getFromSecureStorage(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}

export async function saveJWT(value: string) {
  await SecureStore.setItemAsync('jwt', value)
}

export const setUserToStorage = async (user: UserLoginData) => {
  try {
    await AsyncStorage.setItem("userEmail", user.email);
    await AsyncStorage.setItem("userName", user.username);
  } catch (err) {
    return null;
  }
};
