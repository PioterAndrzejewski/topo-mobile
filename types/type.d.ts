/// <reference types="nativewind/types" />

import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Areas: undefined;
  ResultsList: {
    currentItemType: number;
    id: string;
  };
};

export type HomeScreenNavigationProp = NativeStackScreenProps<
  HomeStackNavigationParamList,
  Home,
  Login,
  Register,
  Areas,
  ResultsList
>;

export type Props = NativeStackScreenProps<HomeStackNavigatorParamList, 'ResultsList'>;
