import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import ScreenTitle from "src/components/common/ScreenTitle";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import Button from "src/components/common/Button";
import { TickIcon } from "src/components/icons/Tick";
import { palette, styleGuide } from "src/styles/theme";
import { HomeScreenNavigationProp, RootStackParamList } from "src/types/type";

type ResetSuccessScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "ResetPasswordSuccessScreen"
>;

const ResetPasswordSuccessScreen = (props: ResetSuccessScreenProps) => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { top, bottom } = useSafeAreaInsets();
  const { email } = props.route.params;
  return (
    <SafeAreaView style={{ backgroundColor: palette.white, flex: 1 }}>
      <View
        style={{ paddingTop: top, paddingBottom: bottom }}
        paddingHorizontal='m'
      >
        <View
          justifyContent='center'
          alignItems='center'
          zIndex={999}
          elevation={999}
          marginVertical='l'
        >
          <Animated.View entering={FadeInDown.delay(300)}>
            <View padding='l' {...styleGuide.cardShadow} borderRadius={70}>
              <TickIcon size={60} />
            </View>
          </Animated.View>
        </View>
        <ScreenTitle title='Zresetowano hasło' />
        <View flexDirection='row' flexWrap='wrap' marginVertical='xl'>
          <Text variant='h3' color='textGray'>
            Jeżeli adres e-mail{" "}
            <Text variant='h3' color='textSecondary'>
              {email}
            </Text>{" "}
            istnieje we naszej bazie, został na niego przesłany link do
            zresetowania hasła.
          </Text>
        </View>
        <View marginBottom='xl'>
          <Text variant='h4' color='textGray'>
            To wszystko co możesz tu zrobić.
          </Text>
        </View>
        <Button
          label='Wróć do logowania'
          onClick={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResetPasswordSuccessScreen;
