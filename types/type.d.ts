/// <reference types="nativewind/types" />

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Areas: undefined;
  Regions: {
    id: string;
  };
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigationParamList,
  Home,
  Login,
  Register,
  Areas,
  Regions
>;

export type Props = NativeStackScreenProps<HomeStackNavigatorParamList, 'Regions'>;
