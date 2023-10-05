import React from "react";
import { SafeAreaView } from "react-native";

import LoginPanel from "../Components/auth/LoginPanel";
import ScreenTitle from "../Components/common/ScreenTitle";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <ScreenTitle title='Lecimy na wspin?!' />
      <LoginPanel />
    </SafeAreaView>
  );
}
