/// <reference types="nativewind/types" />

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Rock: {
    id: string;
  };
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigationParamList,
  Home,
  Login,
  Register,
  Rock
>;
