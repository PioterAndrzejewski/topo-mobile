import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import * as yup from "yup";

import Button from "src/components/common/Button";
import CustomTextInput from "src/components/common/CustomTextInput";

import { login } from "src/services/auth";
import { saveJWT, setUserToStorage } from "src/services/store";
import { styleGuide } from "src/styles/guide";
import { HomeScreenNavigationProp } from "src/types/type";

export default function LoginPanel() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { mutate, isLoading, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: LoginData) => login(data.email, data.password),
    onSuccess: (data) => {
      saveJWT(data.jwt);
      setUserToStorage(data.user);
      navigation.navigate("HomeNavigator");
    },
  });
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "mikel@gg.pl",
      password: "mikel1",
    },
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: LoginData) => {
    mutate(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Topo na wyciągnięcie ręki</Text>
      <View style={styles.innerContainer}>
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
              />
            )}
          />
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
          <Button
            label='Zaloguj'
            onClick={handleSubmit(onSubmitHandler)}
            isLoading={isLoading}
          />
          {isError && (
            <Button
              label='Uzywaj w trybie offline'
              onClick={() => navigation.navigate("Home")}
            />
          )}
          <View style={styles.registerContainer}>
            <Text style={styles.noAccount}>Nie masz konta?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Register")}
              hitSlop={20}
            >
              <Text style={styles.signUp}>Zarejestruj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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

type LoginData = yup.InferType<typeof schema>;

const styles = StyleSheet.create({
  container: {
    paddingTop: 24,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  title: {
    color: styleGuide.color.primary["500"],
    ...styleGuide.text.h2,
  },
  innerContainer: {
    marginTop: 36,
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  registerContainer: {
    marginTop: 20,
    ...(styleGuide.center as ViewStyle),
  },
  noAccount: {
    color: styleGuide.color.primary["500"],
    ...styleGuide.text.body,
  },
  signUp: {
    marginLeft: 12,
    color: styleGuide.color.primary["700"],
    ...styleGuide.text.body,
  },
});
