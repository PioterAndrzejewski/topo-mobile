import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "reactotron-react-native";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import Home from "./screens/MapScreen";
import Rock from "./screens/Rock";
import HomeBottomTabNavigator from "./navigators/HomeBottomTabNavigator";

import AppLoading from "./Components/common/AppLoading";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

Reactotron.setAsyncStorageHandler!(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's coennect!

const Stack = createNativeStackNavigator<RootStackParamList>();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 2, cacheTime: 1000 * 60 * 60 * 24 * 30 * 12 },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

export default function App() {
  const [fontLoaded] = useFonts({
    PoppinsBold: require("./assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("./assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("./assets/fonts/PoppinsRegular.ttf"),
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }
  return (
    <GestureHandlerRootView style={styles.container}>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <NavigationContainer>
          <BottomSheetModalProvider>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name='Login' component={LoginScreen} />
              <Stack.Screen name='Register' component={RegisterScreen} />
              <Stack.Screen
                name='HomeNavigator'
                component={HomeBottomTabNavigator}
              />
              <Stack.Screen
                name='Rock'
                component={Rock}
                initialParams={{ id: "yes yes" }}
              />
            </Stack.Navigator>
          </BottomSheetModalProvider>
        </NavigationContainer>
      </PersistQueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
