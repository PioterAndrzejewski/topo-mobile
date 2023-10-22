import React, { useContext } from "react";
import type { FC } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { NavigationContext } from "@react-navigation/native";

import { HomeScreenNavigationProp } from "../../types/type";

type BackArrowProps = {
  linkTo: string;
};

const BackArrow: FC<BackArrowProps> = ({ linkTo }) => {
  const navigation = useContext(NavigationContext);
  return (
    <TouchableHighlight onPress={() => navigation?.navigate(linkTo)}>
      <Text>Go back</Text>
    </TouchableHighlight>
  );
};

export default BackArrow;
