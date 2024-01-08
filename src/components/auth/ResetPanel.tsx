import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity, useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from "react-native-toast-message";
import * as yup from "yup";

import Button from "src/components/common/Button";
import CustomTextInput from "src/components/common/CustomTextInput";
import Text from "src/components/ui/Text";
import View from "src/components/ui/View";

import { resetPass } from "src/services/auth";
import { HomeScreenNavigationProp } from "src/types/type";

export default function ResetPanel() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { height } = useWindowDimensions();
  const { mutate: resetPasswordMutation, isLoading } = useMutation({
    mutationKey: ["resetPass"],
    mutationFn: (data: { email: string }) => resetPass(data.email),
    onError: () => {
      Toast.show({
        type: "error",
        text2: "Coś poszło nie tak. Spróbuj ponownie później.",
      });
    },
    onSuccess: async () => {
      navigation.navigate("ResetPasswordSuccessScreen", {
        email: getValues().email,
      });
    },
  });
  const { control, handleSubmit, getValues } = useForm({
    defaultValues: {
      email: "mikel@gg.pl",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: LoginData) => {
    resetPasswordMutation(data);
  };

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
      <View
        height={height}
        backgroundColor='backgroundScreen'
        paddingHorizontal='m'
      >
        <Text variant='h2' color='textGray'>
          Wpisz adres e-mail przypisany do konta
        </Text>
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
              <Button
                label='Resetuj hasło'
                onClick={handleSubmit(onSubmitHandler)}
                isLoading={isLoading}
              />
            </View>
            <View
              marginTop='l'
              justifyContent='center'
              alignItems='center'
              flexDirection='row'
            >
              <Text variant='body' color='textGray'>
                Niechcąco się kliknęło? Wróć do
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                hitSlop={20}
              >
                <View marginLeft='m'>
                  <Text variant='body' color='textSecondary'>
                    logowania
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
});

type LoginData = yup.InferType<typeof schema>;
