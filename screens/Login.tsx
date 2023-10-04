import React from "react";
import { View } from "react-native";

import LoginPanel from "../Components/auth/LoginPanel";
import ScreenTitle from "../Components/common/ScreenTitle";

export default function LoginScreen() {
  return (
    <View>
      <ScreenTitle title='Lecimy na wspin?!' />
      <LoginPanel />
    </View>
  );
}
