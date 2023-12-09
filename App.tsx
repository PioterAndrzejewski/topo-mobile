import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "reactotron-react-native";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import RootNavigator from "./navigators/RootNavigator";

import AppLoading from "./components/common/AppLoading";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { FavoritesContextProvider } from "./context/FavoritesContext";

Reactotron.setAsyncStorageHandler!(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
  .configure() // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's coennect!

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
    <>
      <GestureHandlerRootView style={styles.container}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}
        >
          <NavigationContainer>
            <BottomSheetModalProvider>
              <FavoritesContextProvider>
                <RootNavigator />
              </FavoritesContextProvider>
            </BottomSheetModalProvider>
          </NavigationContainer>
        </PersistQueryClientProvider>
      </GestureHandlerRootView>
      <Toast topOffset={60} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
