import { useNavigation } from "@react-navigation/native";
import { useSetAtom } from "jotai";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenTitle from "src/components/common/ScreenTitle";
import View from "src/components/ui/View";
import AccountDetails from "src/components/user/AccountDetails";
import ButtonList from "src/components/user/ButtonList";
import Statistics from "src/components/user/Statistics";
import SubscriptionDetails from "src/components/user/SubscriptionDetails";

import { logout } from "src/services/store";
import { confirmActionAtom } from "src/store/global";
import { palette } from "src/styles/theme";
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

  const logoutButton = [
    {
      label: "Zmień hasło",
      action: () => navigation.navigate("ChangePassword"),
    },
    {
      label: "Wyloguj",
      action: handleLogout,
    },
  ];

  const termsButtons = [
    {
      label: "Regulamin korzystania z aplikacji",
      action: () => console.log("regulamin"),
    },
    {
      label: "Inne",
      action: () => console.log("inne"),
    },
    {
      label: "Informacje o aplikacji",
      action: () => console.log("o aplikacji"),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.white }}>
      <ScreenTitle centered title='Twój profil' />
      <ScrollView style={{ flex: 1 }}>
        <View borderColor='backgroundSecondary' gap='xl' pt='s'>
          <AccountDetails />
          <SubscriptionDetails />
          <Statistics />
          <ButtonList buttonList={termsButtons} />
          <ButtonList buttonList={logoutButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
