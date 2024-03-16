import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import ScreenTitle from "src/components/common/ScreenTitle";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import Button from "src/components/common/Button";
import { ConfirmMailIcon } from "src/components/icons/ConfirmMail";
import { login, resetVerificationEmail } from "src/services/auth";
import {
  saveJWT,
  saveRefreshToken,
  setUserToStorage,
} from "src/services/store";
import { palette, styleGuide } from "src/styles/theme";
import { HomeScreenNavigationProp, RootStackParamList } from "src/types/type";

type ResetSuccessScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Registered"
>;

const RegisteredScreen = (props: ResetSuccessScreenProps) => {
  const [countdown, setCountdown] = useState(10);
  const [loginCountdown, setLoginCountdown] = useState(0);
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { email, password } = props.route.params;
  const { top, bottom } = useSafeAreaInsets();

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (countdown > 0) {
      timeout = setTimeout(() => {
        setCountdown((prev) => --prev);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [countdown]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (loginCountdown > 0) {
      timeout = setTimeout(() => {
        setLoginCountdown((prev) => --prev);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [loginCountdown]);

  const { mutate: loginAgain, isPending: isLoading } = useMutation({
    mutationKey: ["login"],
    mutationFn: () => login(email, password),
    onError: async (data) => {
      if (data instanceof AxiosError) {
        Toast.show({
          type: "error",
          text2: "Wygląda na to, ze Twoj e-mail dalej jest niepotwierdzony",
        });
        setLoginCountdown(30);
      }
    },
    onSuccess: async (data) => {
      await saveJWT(data.jwt);
      await saveRefreshToken(data.refreshToken);
      await setUserToStorage(data.user);
      navigation.navigate("HomeNavigator", { email });
    },
  });

  const { mutate: sendVerificationAgain } = useMutation({
    mutationKey: ["sendVerification"],
    mutationFn: () => resetVerificationEmail(email),
    onSuccess: async (data) => {
      setCountdown(120);
    },
  });

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
              <ConfirmMailIcon size={60} />
            </View>
          </Animated.View>
        </View>
        <ScreenTitle title='Potwierdź swój e-mail zeby się zalogować' />
        <View flexDirection='row' flexWrap='wrap' marginVertical='xl'>
          <Text variant='h3' color='textGray'>
            Na Twój adres e-mail{" "}
            <Text variant='h3' color='textSecondary'>
              {email}
            </Text>{" "}
            wysłaliśmy wiadomość z linkiem do potwierdzenia maila.
          </Text>
          <Text variant='h3' color='textGray'></Text>
        </View>
        <View marginBottom='xl'>
          <Text variant='body' color='textBlack'>
            Nie mozesz znaleźć wiadomości?{" "}
            <TouchableOpacity
              disabled={countdown > 0}
              onPress={() => sendVerificationAgain()}
            >
              <Text
                variant='body'
                color={countdown > 0 ? "textGray" : "textSecondary"}
              >
                Wyślij jeszcze raz {countdown > 0 && `(za ${countdown}s)`}
              </Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View gap='m'>
          <Button
            label={`Spróbuj się zalogować ponownie ${
              loginCountdown > 0 ? `(za: ${loginCountdown}s)` : ""
            }`}
            onClick={() => loginAgain()}
            isLoading={isLoading}
            disabled={loginCountdown > 0}
            labelColor={loginCountdown > 0 ? "textGray" : "textWhite"}
          />
          <Button
            label='Wróć do logowania'
            onClick={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisteredScreen;
