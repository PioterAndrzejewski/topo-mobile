import { SafeAreaView } from "react-native-safe-area-context";

import ScreenTitle from "src/components/common/ScreenTitle";
import ChangePasswordPanel from "src/components/user/ChangePasswordPanel";

import { palette } from "src/styles/theme";

export default function ChangePasswordScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: palette.white }}>
      <ScreenTitle title='Chcesz zmienić hasło?' hasBackButton />
      <ChangePasswordPanel />
    </SafeAreaView>
  );
}
