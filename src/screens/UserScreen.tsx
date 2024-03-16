import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
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
import {
  confirmActionAtom,
  contactAtom,
  wantsToUseNotLoggedAtom,
} from "src/store/global";
import { palette } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";

export default function UserScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const setContact = useSetAtom(contactAtom);
  const setUserWantsToUseNotLogged = useSetAtom(wantsToUseNotLoggedAtom);

  const setConfirmAction = useSetAtom(confirmActionAtom);
  const handleLogout = async () => {
    setConfirmAction({
      confirmFn: () => {
        setUserWantsToUseNotLogged(false);
        logout();
      },
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

  const handleOpenPrivacy = () => {
    Linking.openURL("https://wspinapp.pl/policy").catch((error) => {
      console.log(error);
    });
  };

  const handleOpenTerms = () => {
    Linking.openURL("https://wspinapp.pl/termsandconditions").catch((error) => {
      console.log(error);
    });
  };

  const termsButtons = [
    {
      label: "Regulamin korzystania z aplikacji",
      action: () => console.log("regulamin"),
    },
    {
      label: "Polityka prywatności",
      action: handleOpenPrivacy,
    },
    {
      label: "Skontaktuj się z nami",
      action: handleOpenTerms,
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
