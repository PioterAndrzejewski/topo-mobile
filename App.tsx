import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import Reactotron from "reactotron-react-native";

import AppLoading from "src/components/common/AppLoading";
import RootNavigator from "src/navigators/RootNavigator";
import theme from "src/styles/theme";

import ConfirmActionModal from "src/components/modals/ConfirmActionModal";
import { FavoritesContextProvider } from "src/context/FavoritesContext";
import { saveToSecureStorage } from "src/services/store";

Reactotron.setAsyncStorageHandler!(AsyncStorage)
  .configure()
  .useReactNative()
  .connect();

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
    PoppinsBold: require("src/assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("src/assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("src/assets/fonts/PoppinsRegular.ttf"),
  });

  if (!fontLoaded) {
    return <AppLoading />;
  }

  saveToSecureStorage("jwt", "random");
  
  return (
    <>
      <GestureHandlerRootView style={styles.container}>
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}
        >
          <NavigationContainer>
            <ThemeProvider theme={theme}>
              <BottomSheetModalProvider>
                <FavoritesContextProvider>
                  <RootNavigator />
                  <ConfirmActionModal />
                </FavoritesContextProvider>
              </BottomSheetModalProvider>
            </ThemeProvider>
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
