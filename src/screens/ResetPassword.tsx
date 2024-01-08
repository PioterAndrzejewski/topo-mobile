import { SafeAreaView } from "react-native-safe-area-context";

import ResetPanel from "src/components/auth/ResetPanel";
import ScreenTitle from "src/components/common/ScreenTitle";
import View from "src/components/ui/View";

import { LogoIcon } from "src/components/icons/Logo";
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
        <View padding='3xs' {...styleGuide.cardShadow} borderRadius={70}>
          <LogoIcon size={120} />
        </View>
      </View>
      <ScreenTitle title='Zapomniałeś hasło?' />
      <ResetPanel />
    </SafeAreaView>
  );
}
