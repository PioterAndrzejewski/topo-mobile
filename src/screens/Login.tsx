import { SafeAreaView } from "react-native-safe-area-context";

import LoginPanel from "src/components/auth/LoginPanel";
import ScreenTitle from "src/components/common/ScreenTitle";
import View from "src/components/ui/View";

import { LogoWText } from "src/components/icons/LogoWText";
import { useLoginWithGoogle } from "src/hooks/useLoginWithGoogle";
import { palette } from "src/styles/theme";

export default function LoginScreen() {
  const googleLoading = useLoginWithGoogle();
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
      <ScreenTitle title='Topo na wyciągnięcie ręki' centered />
      <LoginPanel googleIsLoading={googleLoading} />
    </SafeAreaView>
  );
}
