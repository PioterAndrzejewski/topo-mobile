/// <reference types="nativewind/types" />

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigationParamList,
  Home,
  Login,
  Register,
  ResultsList
>;

export type Props = NativeStackScreenProps<HomeStackNavigatorParamList, 'ResultsList'>;
