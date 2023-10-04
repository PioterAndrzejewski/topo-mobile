/// <reference types="nativewind/types" />

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Main: undefined;
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigationParamList,
  Home,
  Login,
  Register,
  Main
>;

export type Props = NativeStackScreenProps<HomeStackNavigatorParamList, Chat>;
