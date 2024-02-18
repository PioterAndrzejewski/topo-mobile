import { SafeAreaView } from "react-native-safe-area-context";

import View from 'src/components/ui/View';
import RegisterPanel from "src/components/auth/RegisterPanel";
import { LogoWText } from 'src/components/icons/LogoWText';

import { palette } from "src/styles/theme";

export default function RegisterScreen() {
  return (
    <SafeAreaView style={{ backgroundColor: palette.white, flex: 1 }}>
      <View
        justifyContent='center'
        alignItems='center'
        zIndex={999}
        elevation={999}
        marginVertical='l'
      >
        <LogoWText size={120} />
      </View>
      <RegisterPanel />
    </SafeAreaView>
  );
}
