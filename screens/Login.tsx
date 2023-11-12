import React from "react";
import { SafeAreaView } from "react-native";

import LoginPanel from "../components/auth/LoginPanel";
import ScreenTitle from "../components/common/ScreenTitle";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <ScreenTitle title='Lecimy na wspin?!' />
      <LoginPanel />
    </SafeAreaView>
  );
}
