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
import { BaseToastProps } from "react-native-toast-message/lib/src/types";
import Reactotron from "reactotron-react-native";

import AppLoading from "src/components/common/AppLoading";
import LastViewed from "src/components/common/toast/LastViewed";
import ConfirmActionModal from "src/components/modals/ConfirmActionModal";
import ContactModal from "src/components/modals/ContactModal";
import RootNavigator from "src/navigators/RootNavigator";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { CustomErrorToast } from "src/components/common/toast/ErrorToast";
import { CustomInfoToast } from "src/components/common/toast/InfoToast";
import { CustomSuccessToast } from "src/components/common/toast/SuccessToast";
import { FavoritesContextProvider } from "src/context/FavoritesContext";
import { FiltersContextProvider } from "src/context/FilteredRocksContext";
import { QueryClientSingleton } from "src/helpers/QueryClient";
import { initApp } from "src/helpers/initApp";
import { navigationRef } from "src/navigators/navigationRef";
import theme from "src/styles/theme";

Reactotron.configure({ host: "192.168.50.16", port: 9090 })
  .useReactNative()
  .connect();

const queryClient = QueryClientSingleton.getInstance();

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

const toastConfig = {
  lastViewed: () => <LastViewed />,
  info: (props: BaseToastProps) => <CustomInfoToast {...props} />,
  error: (props: BaseToastProps) => <CustomErrorToast {...props} />,
  success: (props: BaseToastProps) => <CustomSuccessToast {...props} />,
};

export default function App() {
  const [fontLoaded] = useFonts({
    Outfit900: require("src/assets/fonts/Outfit-Black.ttf"),
    Outfit800: require("src/assets/fonts/Outfit-ExtraBold.ttf"),
    Outfit700: require("src/assets/fonts/Outfit-Bold.ttf"),
    Outfit600: require("src/assets/fonts/Outfit-SemiBold.ttf"),
    Outfit500: require("src/assets/fonts/Outfit-Medium.ttf"),
    Outfit400: require("src/assets/fonts/Outfit-Regular.ttf"),
    Outfit300: require("src/assets/fonts/Outfit-Thin.ttf"),
    Outfit200: require("src/assets/fonts/Outfit-Light.ttf"),
    Outfit100: require("src/assets/fonts/Outfit-ExtraLight.ttf"),
  });

  initApp();

  if (!fontLoaded) {
    return <AppLoading />;
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <StripeProvider
        publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""}
      >
        <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister: asyncStoragePersister }}
        >
          <NavigationContainer ref={navigationRef}>
            <SafeAreaProvider>
              <ThemeProvider theme={theme}>
                <BottomSheetModalProvider>
                  <FavoritesContextProvider>
                    <FiltersContextProvider>
                      <RootNavigator />
                      <ConfirmActionModal />
                      <ContactModal />
                      <Toast topOffset={60} config={toastConfig} />
                    </FiltersContextProvider>
                  </FavoritesContextProvider>
                </BottomSheetModalProvider>
              </ThemeProvider>
            </SafeAreaProvider>
          </NavigationContainer>
        </PersistQueryClientProvider>
      </StripeProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
