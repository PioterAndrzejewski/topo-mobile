/// <reference types="nativewind/types" />

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  ResetPassword: undefined;
  ResetPasswordSuccessScreen: { email: string };
  Register: undefined;
  Registered: {
    email: string;
    password: string;
  };
  HomeNavigator: undefined;
  Rock: {
    id: string;
  };
  ChangePassword: undefined;
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
  ResetPasswordSuccessScreen,
  Register,
  Registered,
  Rock,
  ChangePassword
>;
