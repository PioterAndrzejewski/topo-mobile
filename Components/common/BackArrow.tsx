import React, { useContext } from "react";
import type { FC } from "react";
import { View, Text, TouchableHighlight } from "react-native";
import { NavigationContext } from "@react-navigation/native";

import { HomeScreenNavigationProp } from "../../types/type";

type BackArrowProps = {
  currentType: number;
  previousId?: string | null;
};

const BackArrow: FC<BackArrowProps> = ({ currentType, previousId }) => {
  const navigation = useContext(NavigationContext);
  return (
    <TouchableHighlight
      onPress={() =>
        navigation?.navigate("ResultsList", {
          currentItemType: currentType - 1,
          id: previousId ? previousId : null,
        })
      }
    >
      <Text>Go back</Text>
    </TouchableHighlight>
  );
};

export default BackArrow;
