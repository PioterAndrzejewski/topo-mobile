/// <reference types="nativewind/types" />

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Rock: undefined;
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigationParamList,
  Home,
  Login,
  Register,
  Rock
>;

export type Props = NativeStackScreenProps<HomeStackNavigatorParamList, 'ResultsList'>;
