import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import { ScrollView } from "react-native-gesture-handler";

import Button from "src/components/common/Button";
import ScreenTitle from "src/components/common/ScreenTitle";
import View from "src/components/ui/View";

import { logout } from "src/services/store";
import { confirmActionAtom } from "src/store/global";
import { HomeScreenNavigationProp } from "src/types/type";

export default function UserScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setConfirmAction = useSetAtom(confirmActionAtom);
  const handleLogout = async () => {
    setConfirmAction({
      confirmFn: logout,
      message: "Czy na pewno chcesz się wylogować?",
    });
  };
  return (
    <View style={{ flex: 1 }} backgroundColor='backgroundScreen'>
      <ScreenTitle centered title='Twój profil' />
      <ScrollView style={{ flex: 1 }}>
        <View paddingHorizontal='m'>
          <Button label='Wyloguj' onClick={handleLogout} />
        </View>
      </ScrollView>
    </View>
  );
}
