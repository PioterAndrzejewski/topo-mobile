import React, { useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ViewStyle,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@tanstack/react-query";

import { styleGuide } from "../../styles/guide";
import { HomeScreenNavigationProp } from "../../types/type";

import Button from "../common/Button";
import CustomTextInput from "../common/CustomTextInput";
import { register } from "../../services/auth";
import { saveJWT, setUserToStorage } from "../../services/store";

export type Credentials =
  | "email"
  | "username"
  | "password"
  | "passwordConfirmation";

export type CredentialsState = {
  [Key in Credentials]: string;
};

export default function RegisterPanel() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [credentials, setCredentials] = useState<CredentialsState>({
    email: "prefilled@email.com",
    username: "prefilled name",
    password: "prefilled password",
    passwordConfirmation: "prefilled password",
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ["register", [credentials.email]],
    mutationFn: () =>
      register(credentials.username, credentials.email, credentials.password),
    onSuccess: (data) => {
      saveJWT(data.jwt);
      setUserToStorage(data.user);
      navigation.navigate("Main");
    },
  });

  const handleStateChange = (
    value: string,
    field: keyof typeof credentials | undefined,
  ) =>
    setCredentials((prev) => {
      if (!field) return prev;
      const newState = { ...prev };
      newState[field] = value;
      console.log(newState);
      return newState;
    });

  const inputs = [
    {
      label: "Adres e-mail",
      value: credentials.email,
      field: "email",
      error: "",
      touched: false,
    },
    {
      label: "Nazwa użytkownika",
      value: credentials.username,
      field: "username",
      error: "",
      touched: false,
    },
    {
      label: "Hasło",
      value: credentials.password,
      field: "password",
      others: { secure: true },
      error: "",
      touched: false,
    },
    {
      label: "Powtórz hasło",
      value: credentials.passwordConfirmation,
      field: "passwordConfirmation",
      others: { secure: true },
      error: "",
      touched: false,
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          {inputs.map((input) => (
            <CustomTextInput
              label={input.label}
              onChange={handleStateChange}
              value={input.value}
              field={input.field as Credentials}
              {...input.others}
              error={input.error}
              isTouched={input.touched}
              key={input.label}
            />
          ))}
          <ActivityIndicator size='large' />
          <Button
            label='Sign up'
            onClick={mutate}
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

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: "100%",
    height: "100%",
    paddingHorizontal: 20,
    backgroundColor: styleGuide.color.primary["200"],
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
    color: styleGuide.color.white,
    ...styleGuide.text.caption,
  },
  captionLink: {
    textDecorationLine: "underline",
    color: styleGuide.color.primary["900"],
    ...styleGuide.text.caption,
  },
  hasAccount: {
    color: styleGuide.color.white,
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
    ...styleGuide.text.heading["3"],
  },
  documentBody: {
    ...styleGuide.text.body,
  },
});
