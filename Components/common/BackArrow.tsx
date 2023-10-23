import React, { useContext } from "react";
import type { FC } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { NavigationContext } from "@react-navigation/native";

import { HomeScreenNavigationProp } from "../../types/type";

type BackArrowProps = {};

const BackArrow: FC<BackArrowProps> = () => {
  const navigation = useContext(NavigationContext);
  return (
    <TouchableHighlight onPress={() => null}>
      <Text>Go back</Text>
    </TouchableHighlight>
  );
};

export default BackArrow;
