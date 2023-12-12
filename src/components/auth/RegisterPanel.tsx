import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import * as yup from "yup";

import Button from "src/components/common/Button";
import CustomTextInput from "src/components/common/CustomTextInput";

import { register } from "src/services/auth";
import { saveJWT, setUserToStorage } from "src/services/store";
import { styleGuide } from "src/styles/guide";
import { HomeScreenNavigationProp } from "src/types/type";

export default function RegisterPanel() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const { mutate, isLoading } = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: RegisterData) =>
      register(data.username, data.email, data.password),
    onSuccess: (data) => {
      saveJWT(data.jwt);
      setUserToStorage(data.user);
      navigation.navigate("Home");
    },
  });

  const { control, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data: RegisterData) => {
    mutate(data);
  };

  const inputs = [
    {
      label: "Adres e-mail",
      field: "email",
    },
    {
      label: "Nazwa użytkownika",
      field: "username",
    },
    {
      label: "Hasło",
      field: "password",
      others: { secure: true },
    },
    {
      label: "Powtórz hasło",
      field: "confirmPassword",
      others: { secure: true },
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          {inputs.map((input) => (
            <Controller
              key={input.field}
              control={control}
              name={input.field as keyof RegisterData}
              rules={{ required: true }}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => (
                <CustomTextInput
                  hookBlurHandler={onBlur}
                  onChange={(value) => onChange(value)}
                  value={value}
                  label={input.label}
                  error={error}
                  {...input.others}
                />
              )}
            />
          ))}
          <Button
            label='Zarejestruj'
            onClick={handleSubmit(onSubmitHandler)}
            disabled={isLoading}
            isLoading={isLoading}
          />
        </View>
        <View style={styles.privacy}>
          <View style={styles.privacyRow}>
            <Text style={styles.caption}>Rejestrując się akceptujesz</Text>
          </View>
          <View style={styles.privacyRow}>
            <TouchableOpacity
              onPress={() => console.log("open terms")}
              hitSlop={20}
            >
              <Text style={styles.captionLink}>Regulamin</Text>
            </TouchableOpacity>

            <Text style={styles.caption}> i </Text>
            <TouchableOpacity
              onPress={() => console.log("open privacy")}
              hitSlop={20}
            >
              <Text style={styles.captionLink}>Politykę Prywatności.</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.hasAccount}>Masz już konto?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            hitSlop={20}
          >
            <Text style={styles.signIn}>Zaloguj</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Wpisz poprawny adres e-mail")
    .required("Wpisz adres e-mail"),
  username: yup
    .string()
    .min(4, "Nazwa musi mieć 4 znaki")
    .max(32, "Nazwa jest zbyt długa")
    .required("Wpisz adres e-mail"),
  password: yup
    .string()
    .min(6, "Hasło powinno mieć co najmniej 6 znaków")
    .max(32, "Hasło jest zbyt długie")
    .required("Wpisz hasło"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Hasła muszą być takie same"),
});

export type RegisterData = yup.InferType<typeof schema>;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    flexGrow: 1,
  },
  privacy: {
    marginTop: 16,
  },
  privacyRow: {
    ...(styleGuide.center as ViewStyle),
  },
  caption: {
    color: styleGuide.color.primary["900"],
    ...styleGuide.text.caption,
  },
  captionLink: {
    textDecorationLine: "underline",
    color: styleGuide.color.primary["900"],
    ...styleGuide.text.caption,
  },
  hasAccount: {
    color: styleGuide.color.primary["900"],
    ...styleGuide.text.body,
  },
  signUpContainer: {
    marginTop: 20,
    ...(styleGuide.center as ViewStyle),
  },
  signIn: {
    marginLeft: 12,
    color: styleGuide.color.primary["900"],
    ...styleGuide.text.body,
  },
  documentTitle: {
    marginBottom: 30,
    ...styleGuide.text.h3,
  },
  documentBody: {
    ...styleGuide.text.body,
  },
});
