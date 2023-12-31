import { SafeAreaView } from "react-native-safe-area-context";
import RegisterPanel from "src/components/auth/RegisterPanel";

export default function RegisterScreen() {
  return (
    <SafeAreaView>
      <RegisterPanel />
    </SafeAreaView>
  );
}
