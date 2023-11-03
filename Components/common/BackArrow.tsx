import React, { useContext } from "react";
import type { FC } from "react";
import { View, Text, TouchableHighlight, TouchableOpacity } from "react-native";
import { NavigationContext } from "@react-navigation/native";

import { ArrowLeft } from '../icons/ArrowLeft';

type BackArrowProps = {
  onClick: () => void;
};

const BackArrow: FC<BackArrowProps> = ({ onClick }) => {
  return (
    <TouchableOpacity onPress={onClick} hitSlop={{
      top: 10,
      left: 10,
      bottom: 10,
      right: 10,
    }}>
      <ArrowLeft size={40}/>
    </TouchableOpacity>
  );
};

export default BackArrow;
