import { SafeAreaView } from "react-native-safe-area-context";

import ResetPanel from "src/components/auth/ResetPanel";
import ScreenTitle from "src/components/common/ScreenTitle";
import View from "src/components/ui/View";
import { LogoWText } from 'src/components/icons/LogoWText';

import { palette, styleGuide } from "src/styles/theme";

export default function ResetPasswordScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: palette.white }}>
      <View
        justifyContent='center'
        alignItems='center'
        zIndex={999}
        elevation={999}
        marginVertical='l'
      >
        <LogoWText size={120} />
      </View>
      <ScreenTitle title='Zapomniałeś hasło?' centered/>
      <ResetPanel />
    </SafeAreaView>
  );
}
