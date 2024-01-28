import { useSetAtom } from "jotai";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import ScreenTitle from "src/components/common/ScreenTitle";
import View from "src/components/ui/View";
import AccountDetails from "src/components/user/AccountDetails";
import ButtonList from "src/components/user/ButtonList";
import Statistics from "src/components/user/Statistics";
import SubscriptionDetails from "src/components/user/SubscriptionDetails";

import { useUserProfile } from "src/hooks/useUserProfile";
import { logout } from "src/services/store";
import { confirmActionAtom } from "src/store/global";
import { palette } from "src/styles/theme";

const accountButtons = [
  {
    label: "Zmień hasło",
    action: () => console.log("zmień hasło"),
  },
  {
    label: "Jakaś inna akcja",
    action: () => console.log("inna akcja"),
  },
  {
    label: "Usuń konto",
    action: () => console.log("usuń konto"),
  },
];

export default function UserScreen() {
  const user = useUserProfile();
  const setConfirmAction = useSetAtom(confirmActionAtom);
  const handleLogout = async () => {
    setConfirmAction({
      confirmFn: logout,
      message: "Czy na pewno chcesz się wylogować?",
    });
  };

  const logoutButton = [
    {
      label: "Wyloguj",
      action: handleLogout,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.white }}>
      <ScreenTitle centered title='Twój profil' />
      <ScrollView style={{ flex: 1 }}>
        <View borderColor='backgroundSecondary' gap='l' pt="s">
          <AccountDetails />
          <SubscriptionDetails />
          <Statistics />
          <ButtonList buttonList={accountButtons} />
          <ButtonList buttonList={logoutButton} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
