import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import * as Linking from "expo-linking";
import { useAtom } from "jotai";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";

import Button from "src/components/common/Button";
import CustomTextInput from "src/components/common/CustomTextInput";
import Text from "../ui/Text";
import View from "../ui/View";

import { AxiosError } from "axios";
import { apiConfig } from "src/services/apiConfig";
import { login } from "src/services/auth";
import {
  saveJWT,
  saveRefreshToken,
  setUserToStorage,
} from "src/services/store";
import { providerUsedAtom } from "src/store/global";
import { HomeScreenNavigationProp } from "src/types/type";
import { GoogleIcon } from "../icons/Google";

export default function LoginPanel({
  googleIsLoading,
}: {
  googleIsLoading: boolean;
}) {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { height } = useWindowDimensions();
  const [providerUsed, setProviderUsed] = useAtom(providerUsedAtom);

  const { mutate, isLoading, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) => login(data.email, data.password),
    onError: async (data) => {
      if (data instanceof AxiosError) {
        const message = data.response?.data.error.message as string;
        if (
          typeof message === "string" &&
          message.toLowerCase().includes("email is not confirmed")
        ) {
          const formValues = getValues();
          navigation.navigate("Registered", {
            email: formValues.email,
            password: formValues.password,
          });
        }
      }
    },
    onSuccess: async (data) => {
      await saveJWT(data.jwt);
      await saveRefreshToken(data.refreshToken);
      await setUserToStorage(data.user);
      navigation.navigate("HomeNavigator", { email: "userEmail" });
    },
  });

  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: __DEV__ ? "mikel@gg.pl" : "",
      password: __DEV__ ? "mikel1" : "",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: LoginData) => {
    mutate(data);
  };

  const handleGoogle = () => {
    if (providerUsed) {
      setProviderUsed(false);
    }
    Linking.openURL(encodeURI(apiConfig.auth.loginWGoogleIntent)).catch(
      (error) => {
        console.log(error);
      },
    );
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View
        height={height}
        backgroundColor='backgroundScreen'
        paddingHorizontal='m'
      >
        <View alignItems='center'>
          <Text variant='h3' color='textBlack'>
            Zaloguj się i lecimy na wspin!
          </Text>
        </View>
        <View marginTop='xl' justifyContent='space-between' flexGrow={1}>
          <View>
            <Controller
              control={control}
              name='email'
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  hookBlurHandler={onBlur}
                  onChange={(value) => onChange(value)}
                  value={value}
                  label='Adres e-mail'
                  error={error}
                  autoComplete='email'
                />
              )}
            />
            <View marginTop='m'>
              <Controller
                control={control}
                name='password'
                rules={{ required: true }}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <CustomTextInput
                    hookBlurHandler={onBlur}
                    onChange={(value) => onChange(value)}
                    value={value}
                    label='Hasło'
                    error={error}
                    secure
                  />
                )}
              />
            </View>
            <View marginTop='l'>
              <Button
                label='Lecimy!'
                onClick={handleSubmit(onSubmitHandler)}
                isLoading={isLoading || googleIsLoading}
              />
            </View>
            <View justifyContent='center' alignItems='center' my='l'>
              <Text>lub</Text>
            </View>
            <TouchableOpacity onPress={handleGoogle}>
              <View justifyContent='center' alignItems='center'>
                <View
                  py='s'
                  borderColor='textSecondary'
                  borderWidth={1}
                  borderRadius={99}
                  flexDirection='row'
                  justifyContent='center'
                  alignItems='center'
                  gap='m'
                  width='100%'
                >
                  <GoogleIcon size={26} />
                  <View>
                    <Text>Zaloguj kontem Google</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <View
              marginTop='l'
              justifyContent='center'
              alignItems='center'
              flexDirection='row'
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("ResetPassword")}
                hitSlop={20}
              >
                <View marginLeft='m'>
                  <Text variant='body' color='textSecondary'>
                    Nie pamiętasz hasła?
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              marginTop='l'
              justifyContent='center'
              alignItems='center'
              flexDirection='row'
            >
              <Text variant='body' color='textGray'>
                Nie masz konta?
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                hitSlop={20}
              >
                <View marginLeft='m'>
                  <Text variant='body' color='textSecondary'>
                    Zarejestruj się
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Wpisz poprawny adres e-mail")
    .required("Wpisz adres e-mail"),
  password: yup
    .string()
    .min(6, "Hasło powinno mieć co najmniej 6 znaków")
    .max(32, "Hasło jest zbyt długie")
    .required("Wpisz hasło"),
});

export type LoginData = yup.InferType<typeof schema>;
