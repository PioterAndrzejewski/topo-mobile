/// <reference types="nativewind/types" />

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
  ResetPasswordSuccessScreen: {email: string};
  Register: undefined;
  HomeNavigator: undefined;
  Rock: {
    id: string;
  };
};

export type BottomTabParamList = {
  Map: undefined;
  Search: undefined;
  Favourites: undefined;
  User: undefined;
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigationParamList,
  HomeNavigator,
  BottomTabParamList,
  Login,
  'ResetPasswordSuccessScreen',
  ResetPasswordSuccessScreen,
  Register,
  Rock
>;