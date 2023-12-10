import { SafeAreaView } from "react-native";

import LoginPanel from "src/components/auth/LoginPanel";
import ScreenTitle from "src/components/common/ScreenTitle";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <ScreenTitle title='Lecimy na wspin?!' />
      <LoginPanel />
    </SafeAreaView>
  );
}
