import React from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  HomeStackNavigatorParamList,
  HomeScreenNavigationProp,
} from "./types/type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { NavigationContext } from "@react-navigation/native";

import LoginScreen from "./screens/Login";
import RegisterScreen from "./screens/Register";
import AreasScreen from "./screens/Areas";
import RegionsScreen from "./screens/Regions";

import AppLoading from "./Components/common/AppLoading";

const Stack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
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
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='Areas' component={AreasScreen} />
          <Stack.Screen
            name='Regions'
            component={RegionsScreen}
            initialParams={{ id: "noId" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}
