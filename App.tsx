import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { ThemeProvider } from "@shopify/restyle";
import { StripeProvider } from "@stripe/stripe-react-native";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { useFonts } from "expo-font";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import AppLoading from "src/components/common/AppLoading";
import LastViewed from "src/components/common/LastViewed";
import ConfirmActionModal from "src/components/modals/ConfirmActionModal";
import RootNavigator from "src/navigators/RootNavigator";
import theme from "src/styles/theme";

import { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Reactotron from "reactotron-react-native";
import { FavoritesContextProvider } from "src/context/FavoritesContext";
import { QueryClientSingleton } from "src/helpers/QueryClient";
import { initApp } from "src/helpers/initApp";
import { navigationRef } from "src/navigators/navigationRef";

if (__DEV__) {
  Reactotron.configure({ host: "192.168.50.223", port: 9090 })
    .useReactNative() // add all built-in react native plugins
    .connect(); // let's connect!
}

const queryClient = QueryClientSingleton.getInstance();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const toastConfig = {
  lastViewed: () => <LastViewed />,
};

export default function App() {
  const [fontLoaded] = useFonts({
    PoppinsBold: require("src/assets/fonts/PoppinsBold.ttf"),
    PoppinsMedium: require("src/assets/fonts/PoppinsMedium.ttf"),
    PoppinsRegular: require("src/assets/fonts/PoppinsRegular.ttf"),
  });
  const [initAppResult, setInitAppResult] = useState(false);

  useEffect(() => {
    const asyncInit = async () => {
      const result = await initApp();
      setInitAppResult(result);
    };

    asyncInit();
  });

  if (!fontLoaded || !initAppResult) {
    return <AppLoading />;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.container}>
        <StripeProvider
          publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}
        >
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister: asyncStoragePersister }}
          >
            <NavigationContainer ref={navigationRef}>
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
        </StripeProvider>
      </GestureHandlerRootView>
      <Toast topOffset={60} config={toastConfig} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
