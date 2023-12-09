import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/type";

import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
import HomeBottomTabNavigator from "./HomeBottomTabNavigator";
import Rock from "../screens/Rock";

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name='Login' component={LoginScreen} />
    <Stack.Screen name='Register' component={RegisterScreen} />
    <Stack.Screen name='HomeNavigator' component={HomeBottomTabNavigator} />
    <Stack.Screen
      name='Rock'
      component={Rock}
      initialParams={{ id: "yes yes" }}
    />
  </Stack.Navigator>
);

export default RootNavigator;
