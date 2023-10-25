import React, { useContext } from "react";
import type { FC } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { NavigationContext } from "@react-navigation/native";

import { HomeScreenNavigationProp } from "../../types/type";

type BackArrowProps = {
  onClick: () => void;
};

const BackArrow: FC<BackArrowProps> = ({ onClick }) => {
  return (
    <TouchableOpacity onPress={onClick}>
      <Text>Go back</Text>
    </TouchableOpacity>
  );
};

export default BackArrow;
