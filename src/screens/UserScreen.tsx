import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useSetAtom } from "jotai";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

import Button from "src/components/common/Button";
import ScreenTitle from "src/components/common/ScreenTitle";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { useUserProfile } from "src/hooks/useUserProfile";
import { logout } from "src/services/store";
import { confirmActionAtom } from "src/store/global";
import { palette } from "src/styles/theme";
import { HomeScreenNavigationProp } from "src/types/type";

export default function UserScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const user = useUserProfile();
  const setConfirmAction = useSetAtom(confirmActionAtom);
  const handleLogout = async () => {
    setConfirmAction({
      confirmFn: logout,
      message: "Czy na pewno chcesz się wylogować?",
    });
  };

  const currentDate = dayjs();
  const subscriptionDate = dayjs(Number(user.data?.subscriptionTo));

  const renderSubscriptionData = () => (
    <>
      <Text>
        Subskrypcja do:{" "}
        {dayjs(Number(user.data?.subscriptionTo)).format("DD/MM/YYYY")}
      </Text>
      {dayjs().isBefore(subscriptionDate) && (
        <Text>
          Ważna jeszcze {subscriptionDate.diff(currentDate, "day")} dni
        </Text>
      )}
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: palette.white }}>
      <ScreenTitle centered title='Twój profil' />
      <ScrollView style={{ flex: 1 }}>
        <View
          paddingHorizontal='m'
          borderWidth={1}
          borderColor='backgroundSecondary'
        >
          <Text>Użytkownik: {user.data?.username}</Text>
          <Text>E-mail: {user.data?.email}</Text>
          {user.data?.subscriptionTo ? (
            renderSubscriptionData()
          ) : (
            <Text>Subskrypcja: Brak</Text>
          )}
        </View>
        <View paddingHorizontal='m'>
          <Button label='Wyloguj' onClick={handleLogout} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
